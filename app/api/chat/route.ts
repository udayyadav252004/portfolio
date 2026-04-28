import { NextResponse } from "next/server";
import {
  buildSystemPrompt,
  getLocalAssistantReply,
  trimConversation,
  unknownAssistantMessage,
  type PortfolioChatMessage
} from "@/lib/portfolioAssistant";

type ChatRequestBody = {
  messages?: PortfolioChatMessage[];
};

type ChatCompletionResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
  };
};

type ProviderConfig = {
  name: "openrouter" | "openai";
  endpoint: string;
  apiKey: string;
  model: string;
  headers?: Record<string, string>;
};

function getProviderChain() {
  const providers: ProviderConfig[] = [];

  if (process.env.OPENROUTER_API_KEY) {
    providers.push({
      name: "openrouter",
      endpoint: "https://openrouter.ai/api/v1/chat/completions",
      apiKey: process.env.OPENROUTER_API_KEY,
      model: process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini",
      headers: {
        "HTTP-Referer": "https://udayyadav.dev",
        "X-Title": "Uday Yadav Portfolio"
      }
    });
  }

  if (process.env.OPENAI_API_KEY) {
    providers.push({
      name: "openai",
      endpoint: "https://api.openai.com/v1/chat/completions",
      apiKey: process.env.OPENAI_API_KEY,
      model: process.env.OPENAI_MODEL || "gpt-4o-mini"
    });
  }

  return providers;
}

async function callProvider(provider: ProviderConfig, messages: PortfolioChatMessage[]) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(provider.endpoint, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${provider.apiKey}`,
        ...provider.headers
      },
      body: JSON.stringify({
        model: provider.model,
        temperature: 0.35,
        max_tokens: 180,
        messages: [
          {
            role: "system",
            content: buildSystemPrompt()
          },
          ...messages
        ]
      })
    });

    const payload = (await response.json()) as ChatCompletionResponse;

    if (!response.ok) {
      throw new Error(payload.error?.message || `Request failed with ${response.status}`);
    }

    const content = payload.choices?.[0]?.message?.content?.trim();

    if (!content) {
      throw new Error("The AI response was empty.");
    }

    return content;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequestBody;
    const messages = trimConversation(body.messages || [], 10);
    const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");

    if (!latestUserMessage) {
      return NextResponse.json({ error: "A user message is required." }, { status: 400 });
    }

    const providers = getProviderChain();

    if (providers.length === 0) {
      return NextResponse.json({
        message: getLocalAssistantReply(latestUserMessage.content, messages),
        source: "local"
      });
    }

    for (const provider of providers) {
      try {
        const reply = await callProvider(provider, messages);

        return NextResponse.json({
          message: reply,
          source: provider.name
        });
      } catch {
        continue;
      }
    }

    const localReply = getLocalAssistantReply(latestUserMessage.content, messages);

    if (localReply !== unknownAssistantMessage) {
      return NextResponse.json({
        message: localReply,
        source: "local-fallback"
      });
    }

    return NextResponse.json({
      message: "I'm having trouble right now. Try again.",
      source: "error-fallback"
    });
  } catch {
    return NextResponse.json(
      { message: "I'm having trouble right now. Try again." },
      { status: 500 }
    );
  }
}

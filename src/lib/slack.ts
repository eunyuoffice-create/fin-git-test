import axios from 'axios';
import { ContactFormRequest } from '@/types/api';

export async function sendSlackNotification(data: ContactFormRequest): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error('SLACK_WEBHOOK_URL is not configured');
  }

  const message: {
    text: string;
    blocks: Array<{
      type: string;
      text?: { type: string; text: string; emoji?: boolean };
      elements?: Array<{ type: string; text: string }>;
    }>;
  } = {
    text: '🔔 New Contact Form Submission',
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '📋 New Contact Request',
          emoji: true,
        },
      },
        {
       type: 'section',
       text: {
         type: 'mrkdwn',
         text: `*Company:*\n${data.company}`
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Name:*\n${data.name}`
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Phone:*\n${data.phone}`
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Email:*\n${data.email}`
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Business Needs:*\n${data.needs}`
      }
    },
    ],
  };

  // Add Business Needs if provided
  if (data.needs) {
    message.blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Business Needs:*\n${data.needs}`,
      },
    });
  }

  // Add metadata
  message.blocks.push({
    type: 'context',
    elements: [
      {
        type: 'mrkdwn',
        text: `Language: *${data.lang.toUpperCase()}* | Submitted: <!date^${Math.floor(Date.now() / 1000)}^{date_short_pretty} at {time}|${new Date().toISOString()}>`,
      },
    ],
  });

  await axios.post(webhookUrl, message, {
    headers: { 'Content-Type': 'application/json' },
  });
}
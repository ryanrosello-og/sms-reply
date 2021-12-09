import { test } from "@playwright/test";
import MailosaurClient from "mailosaur";

test("POC - reply to SMS via Mailosaur", async ({ page }) => {
  const API_KEY = "YOUR API KEY";
  const SERVER_ID = "YOUR SEVER ID";
  const TIMEOUT = 10000;
  let mailosaur = new MailosaurClient(API_KEY);
  const sms = await mailosaur.messages.search(
    SERVER_ID,
    {
      body: "SMS message your friends to join us on this sale NOW",
    },
    { timeout: TIMEOUT }
  );

  const messageId = sms.items[0].id;
  await mailosaur.messages.reply(messageId, { text: "STOP" });
  await page.waitForTimeout(TIMEOUT);
  await mailosaur.messages.reply(messageId, { text: "HELP" });
  await page.waitForTimeout(TIMEOUT);
  await mailosaur.messages.reply(messageId, { text: "START" });
  await page.waitForTimeout(TIMEOUT);
});

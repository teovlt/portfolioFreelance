"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerPortal } from "@/components/ui/drawer";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { t, i18n } = useTranslation();
  const language = i18n.language;

  // FAQ multilingue - version corrigée
  const faq = [
    {
      question: t("faq.work_hours.question"),
      answer: t("faq.work_hours.answer"),
    },
    {
      question: t("faq.contact.question"),
      answer: t("faq.contact.answer"),
    },
    {
      question: t("faq.long_term_projects.question"),
      answer: t("faq.long_term_projects.answer"),
    },
    {
      question: t("faq.work_process.question"),
      answer: t("faq.work_process.answer"),
    },
    {
      question: t("faq.post_delivery_support.question"),
      answer: t("faq.post_delivery_support.answer"),
    },
    {
      question: t("faq.technologies.question"),
      answer: t("faq.technologies.answer"),
    },
    {
      question: t("faq.custom_quote.question"),
      answer: t("faq.custom_quote.answer"),
    },
    {
      question: t("faq.pricing_showcase.question"),
      answer: t("faq.pricing_showcase.answer"),
    },
    {
      question: t("faq.services_offered.question"),
      answer: t("faq.services_offered.answer"),
    },
  ];

  const handleQuestion = (q: string, a: string) => {
    setMessages((prev) => [...prev, { from: "user", text: q }, { from: "bot", text: a }]);
  };

  // Scroll automatique sur nouvelle réponse
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Drawer direction="right" open={open} onOpenChange={setOpen}>
        <Button variant="default" className="rounded-full shadow-xl px-4 py-3" onClick={() => setOpen(true)}>
          💬
        </Button>

        <DrawerPortal>
          <DrawerContent
            className="
          p-4 rounded-l-2xl
          w-full max-w-[90vw] max-h-[95vh]    /* max 90% largeur écran pour petits devices */
          md:max-w-[500px]      /* max 400px sur medium+ */
          ml-auto
        "
          >
            <DrawerHeader>
              <DrawerTitle className="text-xl">{language === "fr" ? "Centre d'aide VILLET Téo" : "Help Center VILLET Téo"} 🤖</DrawerTitle>
            </DrawerHeader>
            {/* Conteneur scrollable avec max-height */}
            <div className="h-full overflow-y-auto">
              <div className="flex flex-col gap-3">
                {faq.map((item, idx) => (
                  <Button
                    key={idx}
                    variant="secondary"
                    onClick={() => handleQuestion(item.question, item.answer)}
                    className="
                    justify-start
                    whitespace-normal
                    break-words
                    px-4
                    py-4
                    min-h-[60px]
                    text-left
                    w-full
                    max-w-full
                    !flex-none
                    md:flex
                    "
                  >
                    {item.question}
                  </Button>
                ))}
              </div>
            </div>

            <div
              className={`overflow-y-auto p-4 mt-4 rounded-lg`}
              style={{
                minHeight: messages.length > 0 ? "16rem" : "0",
                transition: "min-height 0.3s ease",
              }}
            >
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-2 ${msg.from === "user" ? "text-right text-primary" : "text-left"}`}
                >
                  <span className="inline-block bg-white dark:bg-blue-950 shadow px-3 py-2 rounded-lg break-words">{msg.text}</span>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    </div>
  );
}

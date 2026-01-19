"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MessageCircle, X, Send, User, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Message {
  id: string;
  from: "user" | "bot";
  text: string;
  timestamp: Date;
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { t, i18n } = useTranslation();
  const language = i18n.language;

  // FAQ multilingue
  const faq = [
    { question: t("faq.work_hours.question"), answer: t("faq.work_hours.answer") },
    { question: t("faq.contact.question"), answer: t("faq.contact.answer") },
    { question: t("faq.long_term_projects.question"), answer: t("faq.long_term_projects.answer") },
    { question: t("faq.work_process.question"), answer: t("faq.work_process.answer") },
    { question: t("faq.post_delivery_support.question"), answer: t("faq.post_delivery_support.answer") },
    { question: t("faq.technologies.question"), answer: t("faq.technologies.answer") },
    { question: t("faq.pricing_design.question"), answer: t("faq.pricing_design.answer") },
    { question: t("faq.pricing_showcase.question"), answer: t("faq.pricing_showcase.answer") },
    { question: t("faq.pricing_features.question"), answer: t("faq.pricing_features.answer") },
    { question: t("faq.pricing_complete.question"), answer: t("faq.pricing_complete.answer") },
    { question: t("faq.custom_quote.question"), answer: t("faq.custom_quote.answer") },
    { question: t("faq.services_offered.question"), answer: t("faq.services_offered.answer") },
  ];

  // Initial greeting and language update
  useEffect(() => {
    const welcomeMsg = messages.find((m) => m.id === "welcome");

    if (open && !welcomeMsg) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: "welcome",
            from: "bot",
            text: t("chat.welcome"),
            timestamp: new Date(),
          },
        ]);
      }, 1000);
    } else if (welcomeMsg && welcomeMsg.text !== t("chat.welcome")) {
      setMessages((prev) => prev.map((msg) => (msg.id === "welcome" ? { ...msg, text: t("chat.welcome") } : msg)));
    }
  }, [open, messages, t]);

  const handleQuestion = (q: string, a: string) => {
    // User message
    const userMsg: Message = {
      id: Date.now().toString(),
      from: "user",
      text: q,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Bot response simulation
    setTimeout(() => {
      setIsTyping(false);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        from: "bot",
        text: a,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1500);
  };

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] shadow-2xl rounded-2xl overflow-hidden"
          >
            <Card className="h-full border-0 flex flex-col shadow-none bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm">
              {/* Header */}
              <CardHeader className="p-4 bg-primary/5 border-b flex flex-row items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                      <AvatarImage src="/images/reviews/me.png" />
                      <AvatarFallback>TV</AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Assistant Téo Villet</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-primary" />
                      {language === "fr" ? "En ligne" : "Online"}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>

              {/* Chat Area */}
              <CardContent className="flex-1 p-0 overflow-hidden relative flex flex-col">
                <ScrollArea className="flex-1 p-4">
                  <div className="flex flex-col gap-4 pb-4">
                    <div className="text-xs text-center text-muted-foreground my-2">
                      {new Date().toLocaleDateString(language === "fr" ? "fr-FR" : "en-US", {
                        weekday: "long",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>

                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className={`flex gap-2 max-w-[85%] ${msg.from === "user" ? "self-end flex-row-reverse" : "self-start"}`}
                      >
                        {msg.from === "bot" && (
                          <Avatar className="h-8 w-8 shrink-0 mt-1">
                            <AvatarImage src="/images/reviews/me.png" />
                            <AvatarFallback>TV</AvatarFallback>
                          </Avatar>
                        )}

                        <div
                          className={`
                            rounded-2xl px-4 py-2 text-sm shadow-sm
                            ${
                              msg.from === "user"
                                ? "bg-primary text-primary-foreground rounded-tr-none"
                                : "bg-muted text-foreground rounded-tl-none"
                            }
                          `}
                        >
                          {msg.text}
                          <div
                            className={`text-[10px] mt-1 opacity-70 ${msg.from === "user" ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                          >
                            {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-2 max-w-[85%] self-start"
                      >
                        <Avatar className="h-8 w-8 shrink-0 mt-1">
                          <AvatarImage src="/images/reviews/me.png" />
                          <AvatarFallback>TV</AvatarFallback>
                        </Avatar>
                        <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                            className="bg-current rounded-full w-1.5 h-1.5 opacity-50"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                            className="bg-current rounded-full w-1.5 h-1.5 opacity-50"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                            className="bg-current rounded-full w-1.5 h-1.5 opacity-50"
                          />
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Suggestions / Input Area Placeholder */}
                <div className="p-2 border-t bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/20">
                  <div className="flex gap-2 overflow-x-auto pb-2 px-1 scrollbar-hide snap-x">
                    {faq.map((item, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuestion(item.question, item.answer)}
                        className="rounded-full text-xs whitespace-nowrap flex-shrink-0 snap-start border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        {item.question}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 relative"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <X className="h-6 w-6" />
          ) : (
            <>
              <MessageCircle className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 animate-pulse border-2 border-white dark:border-slate-900"></span>
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
}

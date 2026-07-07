import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Check, X, User } from "lucide-react";
import { useAgentStatus } from "../../../context/AgentStatusContext";

// Simple notification sound using Web Audio API
const playNotificationSound = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.frequency.setValueAtTime(880, ctx.currentTime);
    oscillator.frequency.setValueAtTime(1100, ctx.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(880, ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.5);
  } catch {
    // Silently fail if audio context isn't available
  }
};

// Mock incoming chat data
const mockCustomerNames = [
  "Alex Thompson",
  "Maria Garcia",
  "Jordan Lee",
  "Sam Patel",
  "Chris Kim",
  "Taylor Brown",
  "Morgan Davis",
  "Riley Johnson",
];

const mockMessages = [
  "Hi, I need help with my order",
  "Can you help me with billing?",
  "I have a question about my account",
  "Hello, I need technical support",
  "I'd like to request a refund",
  "Can you check my subscription status?",
  "I'm having trouble logging in",
  "Need help with a product issue",
];

const ChatNotificationPopup = () => {
  const { isAcceptingChats, canAcceptMore, acceptChat } = useAgentStatus();
  const [notifications, setNotifications] = useState([]);
  const timerRef = useRef(null);

  const addNotification = useCallback(() => {
    if (!canAcceptMore) return;

    const id = `chat-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const notification = {
      id,
      customerName:
        mockCustomerNames[Math.floor(Math.random() * mockCustomerNames.length)],
      message: mockMessages[Math.floor(Math.random() * mockMessages.length)],
      timestamp: new Date(),
    };

    setNotifications((prev) => [...prev, notification]);
    playNotificationSound();

    // Auto-dismiss after 15 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 15000);
  }, [canAcceptMore]);

  // Simulate incoming chats when accepting
  useEffect(() => {
    if (isAcceptingChats && canAcceptMore) {
      // First chat comes after 5-10 seconds
      const initialDelay = 5000 + Math.random() * 5000;
      timerRef.current = setTimeout(() => {
        addNotification();
        // Subsequent chats come every 15-30 seconds
        timerRef.current = setInterval(
          () => {
            addNotification();
          },
          15000 + Math.random() * 15000,
        );
      }, initialDelay);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        clearInterval(timerRef.current);
      }
    };
  }, [isAcceptingChats, canAcceptMore, addNotification]);

  const handleAccept = (notification) => {
    const accepted = acceptChat({
      id: notification.id,
      customerName: notification.customerName,
      message: notification.message,
    });
    if (accepted) {
      setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
    }
  };

  const handleReject = (notification) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
  };

  return (
    <div className="fixed bottom-4 left-4 z-[9998] flex flex-col-reverse gap-2 md:left-24 max-w-[340px]">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="rounded-2xl border border-[var(--titan-card-border)] bg-[var(--titan-bg)] overflow-hidden"
            style={{
              boxShadow:
                "0 12px 40px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1)",
              backdropFilter: "blur(30px) saturate(190%)",
              WebkitBackdropFilter: "blur(30px) saturate(190%)",
            }}
          >
            {/* Header */}
            <div className="px-4 py-3 flex items-center gap-3 border-b border-[var(--titan-card-border)]/50">
              <div className="w-8 h-8 rounded-full bg-[#6BAF8D]/15 flex items-center justify-center shrink-0">
                <MessageSquare
                  size={14}
                  strokeWidth={1.8}
                  className="text-[#6BAF8D]"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-[var(--titan-primary)] truncate">
                  New Chat Request
                </p>
                <p className="text-[11px] text-[var(--titan-text-muted)]">
                  {new Date(notification.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {/* Pulsing indicator */}
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-[#6BAF8D]" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#6BAF8D] animate-ping opacity-75" />
              </div>
            </div>

            {/* Body */}
            <div className="px-4 py-3">
              <div className="flex items-center gap-2 mb-1.5">
                <User
                  size={12}
                  strokeWidth={1.6}
                  className="text-[var(--titan-text-muted)]"
                />
                <span className="text-[12px] font-medium text-[var(--titan-primary)]">
                  {notification.customerName}
                </span>
              </div>
              <p className="text-[12px] text-[var(--titan-text-muted)] leading-relaxed">
                {notification.message}
              </p>
            </div>

            {/* Actions */}
            <div className="px-4 py-2.5 flex gap-2 border-t border-[var(--titan-card-border)]/50">
              <button
                onClick={() => handleAccept(notification)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold text-white bg-[#6BAF8D] hover:bg-[#5a9e7d] transition-colors cursor-pointer"
              >
                <Check size={13} strokeWidth={2.5} />
                Accept
              </button>
              <button
                onClick={() => handleReject(notification)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold text-[var(--titan-danger)] border border-[var(--titan-card-border)] hover:bg-[var(--titan-hover)] transition-colors cursor-pointer"
              >
                <X size={13} strokeWidth={2.5} />
                Reject
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ChatNotificationPopup;

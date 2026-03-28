import { motion } from "framer-motion";

const chatSteps = [
  { role: "user", text: "Alice, where are my keys?" },
  { role: "alice", text: "There is a wooden chair directly in front of you, about two steps away. You left your keys there earlier." },
  { role: "user", text: "Who am I talking to?" },
  { role: "alice", text: "You're speaking with George. He seems happy and is wearing a blue shirt." },
] as const;

function getChatLabel(role: (typeof chatSteps)[number]["role"]) {
  return role === "user" ? "You" : "Alice AI";
}

function getChatAlignment(role: (typeof chatSteps)[number]["role"]) {
  return role === "user" ? "justify-end" : "justify-start";
}

function getChatBubbleClasses(role: (typeof chatSteps)[number]["role"]) {
  return role === "user"
    ? "bg-white/10 text-white border border-white/10"
    : "bg-primary/10 text-primary border border-primary/20 backdrop-blur-md shadow-[0_0_20px_rgba(54,209,255,0.05)]";
}

export default function AliceChatDemo() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="w-full rounded-2xl border border-[#1A2D33] bg-[#060A0C]/70 backdrop-blur-xl">
        <div className="px-8 pt-7 text-center">
          <h3 className="text-[10px] uppercase tracking-[0.24em] text-white/45">AuraVision</h3>
        </div>

        <div className="space-y-6 p-8 pt-6">
          {chatSteps.map((chat, index) => (
            <motion.div
              key={`${chat.role}-${index}`}
              initial={{ opacity: 0, x: chat.role === "user" ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.4, duration: 0.6 }}
              className={`flex ${getChatAlignment(chat.role)}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 text-sm md:text-base leading-relaxed ${getChatBubbleClasses(
                  chat.role,
                )}`}
              >
                <span className="block text-[10px] uppercase tracking-widest mb-1 opacity-50">
                  {getChatLabel(chat.role)}
                </span>
                {chat.text}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

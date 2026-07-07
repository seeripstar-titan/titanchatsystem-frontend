import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "../../../shared/components/PageWrapper";
import { mockExistingBots } from "../data/developMockData";
import BotLanding from "../components/BotLanding";
import BotList from "../components/BotList";
import BotConfigWizard from "../components/BotConfigWizard";
import BotChecklist from "../components/BotChecklist";

// View states: landing | create | list | edit | checklist
const pageTransition = {
  initial: { opacity: 0, y: 10, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -10, filter: "blur(4px)" },
  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
};

const Develop = () => {
  const [view, setView] = useState("landing");
  const [selectedBot, setSelectedBot] = useState(null);
  const [submittedForm, setSubmittedForm] = useState(null);

  const handleLandingSelect = useCallback((option) => {
    if (option === "create") {
      setSelectedBot(null);
      setView("create");
    } else if (option === "status") {
      setView("status");
    } else {
      setView("list");
    }
  }, []);

  const handleBotSelect = useCallback((bot) => {
    setSelectedBot(bot);
    setView("edit");
  }, []);

  const handleWizardSubmit = useCallback((form) => {
    setSubmittedForm(form);
    setView("checklist");
  }, []);

  const handleChecklistEdit = useCallback(() => {
    setSelectedBot(submittedForm);
    setView(selectedBot ? "edit" : "create");
  }, [submittedForm, selectedBot]);

  return (
    <PageWrapper title="Develop">
      <AnimatePresence mode="wait">
        {view === "landing" && (
          <motion.div
            key="landing"
            {...pageTransition}
            className="flex-1 flex flex-col"
          >
            <BotLanding onSelect={handleLandingSelect} />
          </motion.div>
        )}

        {view === "list" && (
          <motion.div key="list" {...pageTransition} className="flex-1">
            <BotList
              bots={mockExistingBots.filter((b) => b.status === "active")}
              onSelect={handleBotSelect}
              onBack={() => setView("landing")}
            />
          </motion.div>
        )}

        {view === "status" && (
          <motion.div key="status" {...pageTransition} className="flex-1">
            <BotList
              bots={mockExistingBots.filter((b) => b.status === "pending")}
              onSelect={(bot) => {
                setSubmittedForm(bot);
                setView("checklist");
              }}
              onBack={() => setView("landing")}
              statusMode
            />
          </motion.div>
        )}

        {(view === "create" || view === "edit") && (
          <motion.div
            key="wizard"
            {...pageTransition}
            className="flex-1 flex flex-col"
          >
            <BotConfigWizard
              mode={view === "create" ? "create" : "edit"}
              initialData={selectedBot}
              onBack={() => setView(view === "create" ? "landing" : "list")}
              onSubmit={handleWizardSubmit}
            />
          </motion.div>
        )}

        {view === "checklist" && submittedForm && (
          <motion.div key="checklist" {...pageTransition} className="flex-1">
            <BotChecklist
              form={submittedForm}
              onBack={() => setView("landing")}
              onEdit={handleChecklistEdit}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default Develop;

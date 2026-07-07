import React, { useState } from "react";
import { Code2, Copy, Check, ExternalLink } from "lucide-react";
import SettingsViewPlaceholder from "../SettingsViewPlaceholder";
import { SettingsCard, SettingsToggle, SettingsRow } from "../SettingsUI";

const InstallLiveChatView = () => {
  const [copied, setCopied] = useState(false);
  const [enabled, setEnabled] = useState(true);

  const snippet = `<!-- Titan LiveChat Widget -->
<script>
  window.__tc = window.__tc || {};
  window.__tc.license = 'YOUR_LICENSE_ID';
  (function(d,s,id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://cdn.titanchat.io/widget.js';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'titan-chat-widget');
</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SettingsViewPlaceholder
      icon={Code2}
      title="Install LiveChat"
      description="Add the chat widget to your website"
    >
      <SettingsCard>
        <SettingsRow
          label="LiveChat widget"
          description="Enable or disable the chat widget on your website"
          accent="#6BAF8D"
        >
          <SettingsToggle enabled={enabled} onChange={setEnabled} />
        </SettingsRow>
      </SettingsCard>

      <SettingsCard>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[14px] font-semibold text-[var(--titan-primary)]">
            Installation code
          </p>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium border border-[var(--titan-card-border)] text-[var(--titan-text-muted)] hover:text-[var(--titan-primary)] hover:border-[var(--titan-border-hover)] transition-colors cursor-pointer"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Copied" : "Copy code"}
          </button>
        </div>
        <pre className="p-4 rounded-xl bg-[var(--titan-input-bg)] border border-[var(--titan-input-border)] text-[12px] text-[var(--titan-primary)] font-mono overflow-x-auto custom-scrollbar leading-relaxed">
          {snippet}
        </pre>
        <p className="text-[12px] text-[var(--titan-text-muted)] mt-3">
          Paste this code before the closing{" "}
          <code className="font-mono text-[var(--titan-primary)]">
            &lt;/body&gt;
          </code>{" "}
          tag on every page where you want the widget to appear.
        </p>
      </SettingsCard>
    </SettingsViewPlaceholder>
  );
};

export default InstallLiveChatView;

"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { ContactForm } from "./ContactForm";

type ContactModalProps = {
  className?: string;
  label?: string;
  fullWidth?: boolean;
};

export function ContactModal({ className = "contact-button", label = "提交问题", fullWidth = false }: ContactModalProps) {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <button type="button" className={`${className}${fullWidth ? " wide-button" : ""}`} onClick={() => setOpen(true)}>
        <MessageCircle size={18} aria-hidden="true" />
        {label}
      </button>
      {open ? (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
          <section
            className="contact-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <span className="modal-kicker">真实问题提交</span>
                <h2 id="contact-modal-title">把问题发送到站长邮箱</h2>
              </div>
              <button ref={closeButtonRef} type="button" className="modal-close" aria-label="关闭弹窗" onClick={() => setOpen(false)}>
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <p className="modal-intro">请提交真实安装、部署、API、MCP 或 Agent 运行过程。表单会通过服务器发送邮件。</p>
            <ContactForm compact />
          </section>
        </div>
      ) : null}
    </>
  );
}

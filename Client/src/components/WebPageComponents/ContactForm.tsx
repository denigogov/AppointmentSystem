import "../../styling/WebPage/_contactForm.scss";
import { FormEvent, useRef } from "react";
import ArticleText from "./ArticleText";
import githubLogo from "../../assets/githubLogo.svg";
import linkedInLogo from "../../assets/linkedInLogo.svg";
import { updateActionPrompt } from "../ErrorSuccesMessage";
import { apiGeneralErrorHandle } from "../../helpers/api";
import { useInView } from "react-intersection-observer";

const API_URL = import.meta.env.VITE_API_URL as string;

const ContactForm: React.FC = () => {
  type MessageType = { email: string; message: string; name: string };

  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const sendMessage = async (query: MessageType) => {
    try {
      const res = await fetch(`${API_URL}/tableRoute/formMessage/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
      });

      if (res.ok) {
        updateActionPrompt("Success", "Message send Success");
      } else {
        const errorResponse = await res.json();
        throw new Error(errorResponse.error);
      }
    } catch (err: unknown) {
      apiGeneralErrorHandle(err);
    }
  };

  const submitMessage = async (e: FormEvent) => {
    e.preventDefault();

    const queryData: MessageType = {
      name: nameRef.current?.value || "",
      email: emailRef.current?.value || "",
      message: messageRef.current?.value || "",
    };

    await sendMessage(queryData);

    if (nameRef.current && emailRef.current && messageRef.current) {
      nameRef.current.value = "";
      emailRef.current.value = "";
      messageRef.current.value = "";
    }
  };

  return (
    <div className="contactForm">
      <form className="contactForm__form" onSubmit={submitMessage}>
        <input
          ref={nameRef}
          type="text"
          required
          minLength={3}
          placeholder="name"
          className="contactForm__form-name"
        />
        <input
          ref={emailRef}
          type="email"
          minLength={3}
          required
          placeholder="email"
          className="contactForm__form-email"
        />

        <textarea
          className="contactForm__form-message"
          ref={messageRef}
          placeholder="I'd like to chat about"
          id="message_input"
          cols={30}
          rows={5}
          required
        ></textarea>

        <button className="action__button-global" type="submit">
          Send Message
        </button>
      </form>

      <footer
        className={`contactForm__info ${
          inView && "articleText-observerAnimation"
        }`}
      >
        <ArticleText
          title="Get in Touch"
          subTitle="Have questions or interested in my work? Reach out using the form below, and let's connect"
          text="Feel free to drop me a message using the form,  Additionally, you can find me on GitHub and LinkedIn for more about my projects and professional background."
          observerIntersepcting={ref}
        />

        <article className="contactForm__info-footer">
          <a target="_blank" href="https://github.com/denigogov">
            <img src={githubLogo} alt="github Logo" style={{ width: "40px" }} />
          </a>

          <a
            target="_blank"
            href="https://www.linkedin.com/in/dejan-gogov-571871270/"
          >
            <img
              src={linkedInLogo}
              alt="linkedIn Logo"
              style={{ width: "47px" }}
            />
          </a>
        </article>
      </footer>
    </div>
  );
};

export default ContactForm;

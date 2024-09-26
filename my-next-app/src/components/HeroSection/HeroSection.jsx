import React, { useState, useEffect, useMemo } from 'react';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const [text, setText] = useState('');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0); // Track the current message
  const [charIndex, setCharIndex] = useState(0); // Track character typing
  const [isTyping, setIsTyping] = useState(true); // Track if typing is in progress
  const messages = useMemo(() => [
    'Welcome to Reel Magic, the home of movie reviews you can trust.',
    'Join the Reel Revolution!',
    'A new way to share your thoughts.',
    'Reel people, Reel reviews, Reel magic.',
  ], []);
  const typingSpeed = 80; // Speed of typing each character
  const pauseBetweenMessages = 1000; // Pause between messages

  useEffect(() => {
    if (isTyping && charIndex < messages[currentMessageIndex].length) {
      const timeout = setTimeout(() => {
        // Update the text with the next character
        setText((prev) => prev + messages[currentMessageIndex][charIndex]);
        setCharIndex(charIndex + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout); // Clear timeout on unmount or re-render
    } else if (charIndex === messages[currentMessageIndex].length) {
      // If message is fully typed, pause before clearing and moving to the next
      setIsTyping(false);
      const timeout = setTimeout(() => {
        setText(''); // Clear the text
        setCharIndex(0); // Reset character index for the next message
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length); // Move to next message
        setIsTyping(true); // Restart typing
      }, pauseBetweenMessages);

      return () => clearTimeout(timeout); // Clear timeout on unmount or re-render
    }
  }, [isTyping, charIndex, currentMessageIndex, messages]); // Only re-run when typing states change

  return (
    <div>
      <hr className={styles.hr} />
      <section className={styles.heroSection}>
        {/* Display the typed text */}
        <h1 className={styles.title}>{text}</h1>
        <div className={styles.taglineContainer}>
          <h2 className={styles.tagline}>Reel Magic - The place for movie lovers.</h2>
        </div>
      </section>
      <hr className={styles.hr} />
    </div>
  );
}

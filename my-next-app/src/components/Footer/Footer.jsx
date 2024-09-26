import styles from './Footer.module.css';
import teamMembers from './teamMembers';

export default function Footer() {
  return (
    <section className={styles.footerContainer}>
      <div className={styles.namesContainer}>
        {teamMembers.map((member, index) => (
          <div key={index} className={styles.memberSection}>
            <p>{member.name}</p>
            <a href={member.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a
              className={styles.linkedin}
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        ))}
      </div>
      <p className={styles.copyRight}>ⓒ ReelMagic inc. 2024</p>
    </section>
  );
}

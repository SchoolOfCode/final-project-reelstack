import styles from './Modal.module.css';

export default function Review({ isOpen, onClose, children }) {
    if (!isOpen) return null;
  
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <button className={styles.closeButton} onClick={onClose}>X</button>
          {children}
        </div>
      </div>
    );
  };
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

interface ModalProps {
  open?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  closeIcon?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  closeIconClassName?: string;
  isForceNormal?: boolean;
  innerStyle?: React.CSSProperties;
  innerClassName?: string;
  isMaskClose?: boolean;
  isShowCloseIcon?: boolean;
}

const Modal: React.FC<ModalProps> = (props) => {
  const { children, ...restProps } = props;

  if (!props.open) return null;

  return ReactDOM.createPortal(
    (<ModalContent {...restProps}>{children}</ModalContent>) as any,
    document.body
  ) as unknown as React.ReactPortal;
};

export default Modal;

export const ModalContent = (props: ModalProps) => {
  const {
    open,
    onClose,
    children,
    style,
    className,
    isForceNormal,
    innerStyle,
    innerClassName,
    isMaskClose = true
  } = props;

  const isMobile = false;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMaskClose) return;
    if (e.target === e.currentTarget || isMobile) {
      onClose && onClose();
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence mode="wait">
      <div
        className={clsx(
          "fixed inset-0 bg-black/50 flex lg:items-center lg:justify-center z-[200]",
          className
        )}
        style={style}
        onClick={handleBackdropClick}
      >
        <div
          className={`rounded-lg relative ${innerClassName}`}
          style={innerStyle}
        >
          {isMobile && !isForceNormal ? (
            <motion.div
              animate={{
                y: [100, 0],
                transition: {
                  duration: 0.3
                }
              }}
              exit={{
                y: [0, 100]
              }}
              className="w-screen absolute bottom-0 left-0 rounded-t-[20px]"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {children}
            </motion.div>
          ) : (
            <motion.div
              animate={{
                opacity: 1,
                transition: {
                  duration: 0.3
                }
              }}
              exit={{
                opacity: 0
              }}
              className="w-full h-full"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
};

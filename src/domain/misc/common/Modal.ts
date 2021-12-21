interface ModalProps {
  hide?: () => void;
  isShown?: boolean;
  headerText: string;
  children: React.ReactNode;
}

export default ModalProps;

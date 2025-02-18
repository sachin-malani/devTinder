const Toast = ({ message, error }) => {
    
  if (!message) return null;
  return (
    <div className="toast toast-center z-10">
      <div className={`alert ${error ? "alert-error" : "alert-success"}`}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;

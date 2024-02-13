import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
export const Model = ({ IsOpen, onClose, children }) => {
  return createPortal(
    <>
      {IsOpen && (
        <>
          <div className=" relative z-50 m-auto min-h-[200px] max-w-[80%] bg-white p-4">
            <div className="flex justify-end">
              <AiOutlineClose
                onClick={onClose}
                className="cursor-pointer text-2xl transition-shadow duration-300 ease-in-out hover:shadow-md"
              />
            </div>
            {children}
          </div>
          <div className=" absolute top-0 h-screen w-screen backdrop-blur"></div>
        </>
      )}
    </>,
    document.getElementById("model-root"),
  );
};

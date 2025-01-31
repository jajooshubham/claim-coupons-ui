import {Toast} from "~/model/toast";

export default function ToastContainer({ toasts }: {toasts: Toast[]}) {
    return (
        <div className="fixed top-5 right-5 space-y-2 z-50">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`p-3 rounded shadow-md text-white ${
                        toast.type === "success"
                            ? "bg-green-500"
                            : toast.type === "error"
                                ? "bg-red-500"
                                : "bg-gray-700"
                    }`}
                >
                    {toast.message}
                </div>
            ))}
        </div>
    );
}

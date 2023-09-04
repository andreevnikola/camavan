import { useEffect, useState } from "react";

export const Errors = ({ errors }: { errors: string[] }) => {
  const [errrorsState, setErrrorsState] = useState(errors);
  useEffect(() => {
    setTimeout(() => {
      setErrrorsState(errors.splice(0, 1));
    });
  }, [errors]);
  return (
    <div className="w-fit p-3 fixed bottom-0 right-0">
      {!!errrorsState[0] &&
        errrorsState.map((error) => {
          return (
            <div key={error} className="bg-red-500 text-white rounded-lg p-2">
              Възникна грешка! {error}
            </div>
          );
        })}
    </div>
  );
};

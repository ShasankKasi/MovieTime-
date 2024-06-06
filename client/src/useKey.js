import { useEffect } from "react";

export function useKey(KEY,action){
    useEffect(
        function () {
          function callBack(e) {
            if (e.code.toLowerCase() === KEY.toLowerCase()) {
              action();
            }
          }
          document.addEventListener("keydown", callBack);
          return function () {
            document.removeEventListener("keydown", callBack);
          };
        },
        [action,KEY]
      );
}
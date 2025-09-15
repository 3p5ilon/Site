import Balancer from "react-wrap-balancer";
import type { ReactNode } from "react";

export function Caption({ children }: { children: ReactNode }) {
  return (
    <span className="not-prose block w-full text-xs my-4 font-mono text-neutral-600 dark:text-neutral-400 text-center leading-normal">
      <Balancer>
        <span className="[&>a]:post-link">{children}</span>
      </Balancer>
    </span>
  );
}

import Balancer from "react-wrap-balancer";
import type { ReactNode } from "react";

export function CaptionComponent({ children }: { children: ReactNode }) {
  return (
    <span className="block w-full text-xs my-2 font-mono text-neutral-600 dark:text-[#A1A1A1] text-center leading-normal">
      <Balancer>
        <span className="[&>a]:post-link">{children}</span>
      </Balancer>
    </span>
  );
}

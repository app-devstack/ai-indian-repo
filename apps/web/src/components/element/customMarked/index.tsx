import { createCustomRenders } from "@web/components/element/customMarked/customRenders";
import Markdown from "marked-react";
import { ComponentProps } from "react";

type MarkdownProps = ComponentProps<typeof Markdown>;
export default function CustomMarked({ renderer, ...props }: MarkdownProps) {
  return (
    <Markdown
      breaks
      gfm
      renderer={{
        ...createCustomRenders(),
        ...renderer,
      }}
      {...props}
    />
  );
}

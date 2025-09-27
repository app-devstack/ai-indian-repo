import { uuidV7 } from "@repo/lib";
import { Badge } from "@web/components/ui/badge";
import { Table } from "@web/components/ui/table";
import { cn } from "@web/lib/utils";
import { ReactRenderer } from "marked-react";

type CustomRenderType = Partial<ReactRenderer>;

/**
 * marked-react用のカスタムレンダラー作成関数
 */
export function createCustomRenders() {
  return {
    heading: (text, level) => {
      const HeadElement = `h${level}` as const;

      const styleMap = {
        1: "text-4xl font-extrabold tracking-tight lg:text-5xl",
        2: "text-3xl font-semibold tracking-tight",
        3: "text-2xl font-semibold tracking-tight",
        4: "text-xl font-semibold tracking-tight",
        5: "text-base text-gray-900",
        6: "text-md text-gray-900",
      };

      return <HeadElement className={cn(styleMap[level])}>{text}</HeadElement>;
    },
    // paragraph: () => <></>,
    link: (href, text) => (
      <a
        key={`custom-link-` + uuidV7()}
        href={href}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="text-blue-600 hover:underline"
      >
        {text}
      </a>
    ),
    image: (src, alt, title) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        key={`custom-image-` + uuidV7()}
        src={src}
        alt={alt}
        width={"auto"}
        height={"auto"}
        className="max-w-20 max-h-20 my-2 rounded-md border bg-muted"
        title={title || undefined}
      />
    ),
    // codespan: () => <></>,
    code: (code, language) => (
      <pre
        key={`custom-code-` + uuidV7()}
        className="relative my-2 p-6 bg-muted rounded-md overflow-x-auto"
      >
        {language && (
          <Badge className="absolute top-0 left-0 h-fit py-0 px-1.5 touch-none select-none">
            {language}
          </Badge>
        )}
        <code className={cn("font-mono")}>{code}</code>
      </pre>
    ),
    blockquote: (children) => (
      <div
        key={`custom-blockquote-` + uuidV7()}
        className="py-2 pl-2 border-l-4 border-muted-foreground/30 bg-muted/30 my-4"
      >
        <p>{children}</p>
      </div>
    ),

    list: (children, ordered, _start) => {
      const ListElement = ordered ? "ol" : "ul";

      return (
        <ListElement
          key={`custom-list-` + uuidV7()}
          className={cn(
            "[&>*]:pl-1 [&>*]:list-inside",
            ordered ? "[&>li]:list-decimal " : "[&>li]:list-disc"
          )}
        >
          {children}
        </ListElement>
      );
    },

    // listItem: (children) => (
    //   <li key={`custom-listItem-` + generateUUIDv7()} className="list-inside">
    //     {children}
    //   </li>
    // ),

    // checkbox: () => <></>,
    table: (children) => (
      <Table
        key={`custom-table-` + uuidV7()}
        className={cn(
          "py-2 px-4 border bg-background rounded-md",

          // header
          "[&_thead]:[&_tr]:border-b",

          // th
          "[&_th]:text-foreground [&_th]:h-10 [&_th]:px-2 [&_th]:text-left [&_th]:align-middle [&_th]:font-medium [&_th]:whitespace-nowrap",

          // body
          "[&_tbody]:border-0",

          // row
          "[&_tr]:hover:bg-muted/50 [&_tr]:border-b [&_tr]:transition-colors",

          // cell
          "[&_td]:p-2 [&_td]:align-middle [&_td]:whitespace-nowrap"
        )}
      >
        {children}
      </Table>
    ),
    // tableHeader: () => <></>,
    // tableBody: () => <></>,
    // tableRow: () => <></>,
    // tableCell: () => <></>,

    // strong: () => <></>, // 表示OK
    // em: () => <></>,  // 表示OK
    // del: () => <></>,
    // text: () => <></>,

    /**
     * XSS対策: HTMLタグが検出された場合は警告を表示する
     */
    // html: (_html) => (
    //   <div
    //     key={`custom-html-` + uuidV7()}
    //     className="flex gap-2 p-4 my-4 border border-yellow-400 bg-yellow-50 rounded-md text-yellow-800"
    //   >
    //     <CircleAlertIcon />
    //     <div className="flex flex-col space-y-3">
    //       <div>
    //         <p className="font-semibold">※ HTMLが検出されました｡</p>
    //         <p className=" ">
    //           セキュリティ上の理由により､HTMLタグを含む文章をそのまま埋め込む事はできません｡
    //           <br />
    //           コードブロックとして埋め込むことで表示が可能です｡
    //         </p>
    //       </div>

    //       <div className="flex flex-col gap-1">
    //         <p className="font-semibold">- 検出されたHTML -</p>
    //         <pre className="py-2 px-3 bg-yellow-100 rounded-md overflow-x-auto">
    //           <code>{_html}</code>
    //         </pre>
    //       </div>
    //     </div>
    //   </div>
    // ),

    // hr: () => <></>, // 表示OK
    // br: () => <></>,
  } satisfies CustomRenderType;
}

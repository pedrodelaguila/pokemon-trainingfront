import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { Button } from "../common/Button";

const chatSidebarItemVariants = cva(
  [
    "flex items-center justify-between px-4 py-3 cursor-pointer transition-colors w-full",
    "rounded-lg",
  ],
  {
    variants: {
      variant: {
        base: "bg-white",
        pending: "bg-white",
        selected: "bg-primary-100",
      },
    },
    defaultVariants: {
      variant: "base",
    },
  }
);

export interface ChatSidebarItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chatSidebarItemVariants> {
  teamName: string;
  lastMessage?: string;
  time: string;
  unreadCount?: number;
}

export function ChatSidebarItem({
  className,
  variant,
  teamName,
  lastMessage,
  time,
  unreadCount = 0,
  ...props
}: ChatSidebarItemProps) {
  const showUnreadBadge = variant === "pending" && unreadCount > 0;

  return (
    <div className={clsx(chatSidebarItemVariants({ variant }), className)} {...props}>
      <div className="flex h-full w-full gap-4">
        <div className="flex flex-row justify-between w-full">
          <span className="flex font-nunito font-bold text-[18px] text-black">{teamName}</span>
          <span className={clsx("flex font-nunito text-[12px] text-gray-400 items-center justify-center")}>{time}</span>
        </div>
      </div>
      {showUnreadBadge && (
        <Button
          variant="fulfilled"
          size="small"
          className="text-[12px] font-normal leading-[100%] tracking-normal"
        >
          {unreadCount}
        </Button>
      )}
    </div>
  );
}

export default ChatSidebarItem;

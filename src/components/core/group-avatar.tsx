import { generateAvatarProps } from "@/helper/generic";
import { IUser } from "@/types/system/slice";
import { Avatar } from "./avatar";
import { cn } from "@/helper/generic"; // assuming you have this utility

function GroupAvatars({ users }: { users: IUser[] }) {
  const maxDisplayed = 2;
  const displayed = users.slice(0, maxDisplayed);
  const remaining = users.length - maxDisplayed;

  return (
    <div className="flex items-center relative ">
      {" "}
      {/* adjusted overlap for nicer look */}
      {displayed.map((user, index) => {
        const props = generateAvatarProps(user);
        return (
          <Avatar
            key={user._id}
            {...props}
            className={cn(
              "size-8 ring-2 ring-[var(--chat-header-bg)]",
              "transition-transform hover:scale-110 hover:z-10",
              index === 0 ? "ml-0" : "-ml-6",
            )}
          />
        );
      })}
      {remaining > 0 && (
        <div
          className={cn(
            "size-6 rounded-full bg-gradient-to-br absolute top-0 right-0 z-2 from-gray-700 to-gray-900",
            "flex items-center justify-center text-xs font-bold text-white",
            "ring-2 ring-[var(--chat-header-bg)] shadow-md",
            "border border-white/20",
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}

export default GroupAvatars;

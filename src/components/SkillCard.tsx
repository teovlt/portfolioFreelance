export interface SkillCardProps {
  iconUrl: string;
  name: string;
  body: string;
}

export const SkillCard = ({ iconUrl, name, body }: SkillCardProps) => {
  return (
    <div className="w-full p-3 rounded-xl border shadow-sm bg-secondary dark:bg-secondary border-zinc-200 dark:border-zinc-700 transition hover:shadow-md">
      <div className="flex items-center gap-3">
        <img src={iconUrl} alt={name} width={28} height={28} className="rounded-full" />
        <div>
          <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{name}</h4>
        </div>
      </div>
      <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-snug line-clamp-3">{body}</p>
    </div>
  );
};

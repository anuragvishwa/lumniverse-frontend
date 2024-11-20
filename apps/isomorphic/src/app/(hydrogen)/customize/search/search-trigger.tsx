import { PiCommand, PiMagnifyingGlassBold } from 'react-icons/pi';
import cn from '@core/utils/class-names';

type SearchTriggerProps = {
  placeholderClassName?: string;
  icon?: React.ReactNode;
  lang?: string;
  t?: (key: string) => string | undefined;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function SearchTrigger({
  icon,
  className,
  placeholderClassName,
  t,
  ...props
}: SearchTriggerProps) {
  return (
    <button aria-label="Search" className={cn('', className)} {...props}>
      {icon ? (
        icon
      ) : (
        <PiMagnifyingGlassBold className="magnifying-glass me-2 h-[18px] w-[18px]" />
      )}

      {/* <span className="search-command ms-auto hidden items-center text-sm text-gray-600 lg:flex lg:rounded-md lg:bg-primary lg:px-1.5 lg:py-1 lg:text-xs lg:font-semibold lg:text-primary-foreground xl:justify-normal">
        <PiCommand strokeWidth={1.3} className="h-[15px] w-[15px]" />K
      </span> */}
    </button>
  );
}

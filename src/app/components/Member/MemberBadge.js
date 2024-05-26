import { Badge, Tooltip } from "@mantine/core";

function MemberBadge({
  color,
  name,
  className,
  classNameWrap,
  disableTooltip = false,
  size = "md",
  onClick,
}) {
  return (
    <Tooltip label={name} disabled={disableTooltip}>
      <Badge
        size={size}
        className={className}
        variant="filled"
        circle
        color={color}
        onClick={onClick}
      >
        {name ? name.slice(0, 2) : ""}
      </Badge>
    </Tooltip>
  );
}

export default MemberBadge;

import { useState, useMemo, memo, useCallback } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Typography,
  InputAdornment,
  Tooltip,
  IconButton,
  Divider,
  Skeleton,
  MenuItem,
} from "@mui/material";
import {
  LuSearch,
  LuFilter,
  LuRefreshCw,
  LuMessageSquare,
  LuPlus,
  LuBuilding2,
  LuUsers,
  LuLock,
  LuCreditCard,
  LuFileText,
  LuShield,
  LuClipboardList,
  LuAlertCircle,
} from "react-icons/lu";
import { TEMPLATE_CATEGORIES } from "./emailTemplateData";
import {
  STATUS_COLORS,
  LeftPanel,
  SidebarHeaderWrapper,
  SidebarHeaderTitleRow,
  SidebarHeaderCount,
  SidebarHeaderIconsRow,
  SidebarSearchField,
  SidebarListContainer,
  SidebarEmptyContainer,
  SidebarFooterWrapper,
  SidebarCreateButton,
  StyledListItem,
  SidebarListItemAvatar,
  SidebarListItemChip,
  SidebarListItemText,
  SidebarListItemSub,
  SidebarSkeletonRow,
  SkeletonCircle,
  FlexRowAlignStart,
  FlexFill,
  FlexRowSpaceBetweenGap,
  SidebarSelectFormControl,
  SidebarSelectField,
} from "./SmsTemplates.styles";

const TEMPLATE_ICONS = {
  agency: LuBuilding2,
  carrier: LuBuilding2,
  user: LuUsers,
  lock: LuLock,
  billing: LuCreditCard,
  receipt: LuFileText,
  policy: LuShield,
  claim: LuClipboardList,
  alert: LuAlertCircle,
  "message-square": LuMessageSquare,
  "message_square": LuMessageSquare,
};

const SmsTemplateListItem = memo(({ template, selected, onClick }) => {
  const Icon = TEMPLATE_ICONS[template.iconType] || LuMessageSquare;
  const statusColor = STATUS_COLORS[template.status] || STATUS_COLORS.Active;

  const handleClick = useCallback(() => {
    onClick(template);
  }, [template, onClick]);

  return (
    <StyledListItem onClick={handleClick} selected={selected}>
      <FlexRowAlignStart style={{ gap: 12 }}>
        <SidebarListItemAvatar selected={selected}>
          <Icon size={14} />
        </SidebarListItemAvatar>
        <FlexFill>
          <FlexRowSpaceBetweenGap>
            <SidebarListItemText
              variant="body2"
              fontWeight={600}
              noWrap
              selected={selected}
            >
              {template.name}
            </SidebarListItemText>
            <SidebarListItemChip
              label={template.status}
              size="small"
              style={{
                backgroundColor: statusColor.bg,
                color: statusColor.text,
              }}
            />
          </FlexRowSpaceBetweenGap>
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            noWrap
          >
            {template.description}
          </Typography>
          <SidebarListItemSub variant="caption">
            Updated: {template.updatedAt}
          </SidebarListItemSub>
        </FlexFill>
      </FlexRowAlignStart>
    </StyledListItem>
  );
});
SmsTemplateListItem.displayName = "SmsTemplateListItem";

function ListItemSkeleton() {
  return (
    <SidebarSkeletonRow>
      <FlexRowAlignStart style={{ gap: 12 }}>
        <SkeletonCircle variant="circular" width={32} height={32} />
        <FlexFill>
          <Skeleton variant="text" width="70%" height={15} />
          <Skeleton
            variant="text"
            width="90%"
            height={12}
            style={{ marginTop: 4 }}
          />
        </FlexFill>
      </FlexRowAlignStart>
    </SidebarSkeletonRow>
  );
}

export default function SmsTemplatesSidebar({
  templates,
  isFetching,
  selectedTemplate,
  onSelectTemplate,
  onRefresh,
  onCreateClick,
}) {
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return templates.filter((t) => {
      const matchesSearch =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q);
      const matchesCategory =
        categoryFilter === "all" || t.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [templates, search, categoryFilter]);

  return (
    <LeftPanel>
      <SidebarHeaderWrapper>
        <SidebarHeaderTitleRow>
          <Typography variant="subtitle2" fontWeight={700}>
            SMS Templates
            {!isFetching && (
              <SidebarHeaderCount
                component="span"
                variant="caption"
                color="text.disabled"
              >
                ({filtered.length})
              </SidebarHeaderCount>
            )}
          </Typography>
          <SidebarHeaderIconsRow>
            <Tooltip title="Refresh list">
              <IconButton
                size="small"
                onClick={onRefresh}
                disabled={isFetching}
              >
                <LuRefreshCw
                  size={13}
                  style={{
                    animation: isFetching ? "spin 1s linear infinite" : "none",
                  }}
                />
              </IconButton>
            </Tooltip>
            <IconButton size="small">
              <LuFilter size={14} />
            </IconButton>
          </SidebarHeaderIconsRow>
        </SidebarHeaderTitleRow>
        <SidebarSearchField
          size="small"
          fullWidth
          placeholder="Search templates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LuSearch size={14} />
              </InputAdornment>
            ),
          }}
        />
        <SidebarSelectFormControl size="small">
          <SidebarSelectField
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            displayEmpty
          >
            {TEMPLATE_CATEGORIES.map((c) => (
              <MenuItem key={c.value} value={c.value} style={{ fontSize: 13 }}>
                {c.label}
              </MenuItem>
            ))}
          </SidebarSelectField>
        </SidebarSelectFormControl>
      </SidebarHeaderWrapper>
      <Divider />
      <SidebarListContainer>
        {isFetching ? (
          Array.from({ length: 5 }).map((_, i) => <ListItemSkeleton key={i} />)
        ) : filtered.length === 0 ? (
          <SidebarEmptyContainer>
            <LuMessageSquare size={32} color={theme.palette.text.disabled} />
            <Typography
              variant="caption"
              color="text.disabled"
              display="block"
              mt={1}
            >
              No templates found
            </Typography>
          </SidebarEmptyContainer>
        ) : (
          filtered.map((tpl) => (
            <SmsTemplateListItem
              key={tpl.id}
              template={tpl}
              selected={selectedTemplate?.id === tpl.id}
              onClick={onSelectTemplate}
            />
          ))
        )}
      </SidebarListContainer>
      <Divider />
      <SidebarFooterWrapper>
        <SidebarCreateButton
          variant="outlined"
          fullWidth
          startIcon={<LuPlus size={15} />}
          size="small"
          onClick={onCreateClick}
        >
          Create New Template
        </SidebarCreateButton>
      </SidebarFooterWrapper>

      {/* Spin animation for refresh icon */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </LeftPanel>
  );
}

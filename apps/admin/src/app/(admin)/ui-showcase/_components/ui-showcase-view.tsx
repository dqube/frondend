"use client";

import * as React from "react";
import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  // Primitives
  Button,
  Input,
  Label,
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Separator,
  Avatar,
  AvatarFallback,
  Skeleton,
  Spinner,
  // Overlays
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  // Context Menu
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuShortcut,
  // Command
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  // Forms
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Textarea,
  // Autocomplete
  Autocomplete,
  MultiSelect,
  // Button Group
  ButtonGroup,
  // Calendar & Date
  DatePicker,
  DateRangePicker,
  DateTimePicker,
  // Layout
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  // Stepper
  Stepper,
  StepperContent,
  StepperItem,
  StepperIndicator,
  StepperSeparator,
  StepperTitle,
  StepperDescription,
  StepperTrigger,
  // Toast
  toast,
  // Alert
  Alert,
  AlertDescription,
  AlertTitle,
  // Data Grid
  DataTable,
  DataGridColumnHeader,
  // Theme
  ThemeToggle,
  // Utils
  cn,
  // Types
  type DateRange,
} from "@modernstores/ui";
import { Toolbar } from "@/components/ui/toolbar";
import { RichTextEditorDemo } from "@/components/tiptap/rich-text-editor";
import { BentoGrid } from "@/components/ui/bento-grid";
import { SpotlightCards } from "@/components/ui/spotlight-cards";
import { ProfileDropdown } from "@/components/ui/profile-dropdown";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/reui-timeline";
import { DateSelector } from "@/components/ui/reui-date-selector";
import type { DateSelectorValue } from "@/components/ui/reui-date-selector";
import { Tree, TreeItem, TreeItemLabel } from "@/components/ui/reui-tree";
import { useTree } from "@headless-tree/react";
import { syncDataLoaderFeature } from "@headless-tree/core";
import {
  Bell,
  Check,
  Copy,
  Download,
  Eye,
  Heart,
  Info,
  Layers,
  Mail,
  Minus,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Settings,
  Share2,
  ShieldCheck,
  Star,
  Trash2,
  Upload,
  User,
  Zap,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  FileText,
  Folder,
  Image,
  Code,
  Terminal,
  BookOpen,
  Calculator,
  Calendar,
  Smile,
  CreditCard,
  UserPlus,
  Package,
} from "lucide-react";

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
      </div>
      {children}
    </section>
  );
}

// ─── Sample data for DataTable ────────────────────────────────────────────────

interface SampleUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  joinDate: string;
}

const SAMPLE_USERS: SampleUser[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "active", joinDate: "2025-01-15" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "Editor", status: "active", joinDate: "2025-02-20" },
  { id: "3", name: "Carol Williams", email: "carol@example.com", role: "Viewer", status: "inactive", joinDate: "2024-11-10" },
  { id: "4", name: "David Brown", email: "david@example.com", role: "Editor", status: "pending", joinDate: "2025-03-01" },
  { id: "5", name: "Eve Davis", email: "eve@example.com", role: "Admin", status: "active", joinDate: "2024-09-05" },
];

const userColumns: ColumnDef<SampleUser, unknown>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(!!v)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataGridColumnHeader column={column} title="Name" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar className="h-7 w-7">
          <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-bold">
            {row.original.name.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <span className="font-medium">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataGridColumnHeader column={column} title="Email" />,
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.email}</span>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <Badge variant="outline">{row.original.role}</Badge>,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const s = row.original.status;
      const variant = s === "active" ? "default" : s === "pending" ? "secondary" : "outline";
      return <Badge variant={variant}>{s}</Badge>;
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "joinDate",
    header: ({ column }) => <DataGridColumnHeader column={column} title="Joined" />,
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <MoreHorizontal className="h-3.5 w-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem><Eye className="h-3.5 w-3.5 mr-2" /> View</DropdownMenuItem>
          <DropdownMenuItem><Pencil className="h-3.5 w-3.5 mr-2" /> Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive"><Trash2 className="h-3.5 w-3.5 mr-2" /> Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

// ─── Autocomplete Options ─────────────────────────────────────────────────────

const FRUIT_OPTIONS = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "grape", label: "Grape" },
  { value: "mango", label: "Mango" },
  { value: "orange", label: "Orange" },
  { value: "peach", label: "Peach" },
  { value: "strawberry", label: "Strawberry" },
];

// ─── Multi-select Options ────────────────────────────────────────────────────

const TEAM_MEMBERS = [
  {
    value: "alice",
    label: "Alice Johnson",
    description: "Product Designer · San Francisco",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
  },
  {
    value: "bob",
    label: "Bob Smith",
    description: "Frontend Developer · New York",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
  },
  {
    value: "carol",
    label: "Carol Williams",
    description: "Backend Engineer · London",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carol",
  },
  {
    value: "david",
    label: "David Brown",
    description: "DevOps Engineer · Berlin",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
  },
  {
    value: "eve",
    label: "Eve Davis",
    description: "Marketing Manager · Toronto",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eve",
  },
];

// ─── Tree data ───────────────────────────────────────────────────────────────

type FileNodeData = { name: string; isFolder: boolean; children?: string[] };

const TREE_ITEMS: Record<string, FileNodeData> = {
  root: { name: "src", isFolder: true, children: ["components", "hooks", "lib"] },
  components: { name: "components", isFolder: true, children: ["ui-dir", "layout-dir"] },
  "ui-dir": { name: "ui", isFolder: true, children: ["button-file", "input-file"] },
  "layout-dir": { name: "layout", isFolder: true, children: ["sidebar-file"] },
  hooks: { name: "hooks", isFolder: true, children: ["use-auth-file"] },
  lib: { name: "lib", isFolder: true, children: ["utils-file"] },
  "button-file": { name: "button.tsx", isFolder: false },
  "input-file": { name: "input.tsx", isFolder: false },
  "sidebar-file": { name: "sidebar.tsx", isFolder: false },
  "use-auth-file": { name: "use-auth.ts", isFolder: false },
  "utils-file": { name: "utils.ts", isFolder: false },
};

// ─── Main Component ──────────────────────────────────────────────────────────

export function UIShowcaseView() {
  const [switchA, setSwitchA] = useState(true);
  const [switchB, setSwitchB] = useState(false);
  const [checkA, setCheckA] = useState(true);
  const [checkB, setCheckB] = useState(false);
  const [dateValue, setDateValue] = useState<Date>();
  const [dateRangeValue, setDateRangeValue] = useState<DateRange | undefined>();
  const [dateTimeValue, setDateTimeValue] = useState<Date>();
  const [autocompleteValue, setAutocompleteValue] = useState("");
  const [stepperValue, setStepperValue] = useState(2);
  const [dateSelectorValue, setDateSelectorValue] = useState<DateSelectorValue | undefined>();
  const [treeExpandedItems, setTreeExpandedItems] = useState<string[]>(["root", "components"]);
  const [treeFocusedItem, setTreeFocusedItem] = useState<string | null>(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const [multiSelectValue, setMultiSelectValue] = useState<string[]>([]);
  const [contextMenuChecked, setContextMenuChecked] = useState(false);
  const [contextMenuRadio, setContextMenuRadio] = useState("comfortable");

  // Command palette keyboard shortcut
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const tree = useTree<FileNodeData>({
    rootItemId: "root",
    getItemName: (item) => item.getItemData().name,
    isItemFolder: (item) => item.getItemData().isFolder,
    features: [syncDataLoaderFeature],
    dataLoader: {
      getItem: (itemId) => TREE_ITEMS[itemId]!,
      getChildren: (itemId) => TREE_ITEMS[itemId]?.children ?? [],
    },
    setExpandedItems: setTreeExpandedItems,
    setFocusedItem: setTreeFocusedItem,
    initialState: {
      expandedItems: treeExpandedItems,
      focusedItem: treeFocusedItem,
    },
  });

  return (
    <div className="space-y-10 pb-12 min-w-0 overflow-x-hidden">

      {/* ── Buttons ──────────────────────────────────────────────────────── */}
      <Section title="Buttons" description="Different variants, sizes, and states.">
        <Card>
          <CardContent className="pt-6 space-y-6">
            {/* Variants */}
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">Variants</Label>
              <div className="flex flex-wrap gap-3">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            <Separator />

            {/* Sizes */}
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">Sizes</Label>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon"><Plus className="h-4 w-4" /></Button>
              </div>
            </div>

            <Separator />

            {/* With icons */}
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">With Icons</Label>
              <div className="flex flex-wrap gap-3">
                <Button><Download className="h-4 w-4 mr-2" /> Download</Button>
                <Button variant="outline"><Upload className="h-4 w-4 mr-2" /> Upload</Button>
                <Button variant="secondary"><Mail className="h-4 w-4 mr-2" /> Send Email</Button>
                <Button variant="destructive"><Trash2 className="h-4 w-4 mr-2" /> Delete</Button>
              </div>
            </div>

            <Separator />

            {/* States */}
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">States</Label>
              <div className="flex flex-wrap gap-3">
                <Button disabled>Disabled</Button>
                <Button disabled><Spinner className="mr-2" /> Loading…</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* ── Inputs & Forms ───────────────────────────────────────────────── */}
      <Section title="Inputs & Forms" description="Text inputs, selects, checkboxes, switches, and textareas.">
        <Card>
          <CardContent className="pt-6 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Text inputs */}
              <div className="space-y-2">
                <Label htmlFor="demo-name">Name</Label>
                <Input id="demo-name" placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demo-email">Email</Label>
                <Input id="demo-email" type="email" placeholder="you@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demo-search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="demo-search" placeholder="Search products…" className="pl-9" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="demo-disabled">Disabled</Label>
                <Input id="demo-disabled" placeholder="Disabled input" disabled />
              </div>
            </div>

            <Separator />

            <div className="grid gap-6 sm:grid-cols-2">
              {/* Select */}
              <div className="space-y-2">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fruits">Fruits</SelectItem>
                    <SelectItem value="vegetables">Vegetables</SelectItem>
                    <SelectItem value="dairy">Dairy</SelectItem>
                    <SelectItem value="bakery">Bakery</SelectItem>
                    <SelectItem value="beverages">Beverages</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Autocomplete */}
              <div className="space-y-2">
                <Label>Autocomplete</Label>
                <Autocomplete
                  options={FRUIT_OPTIONS}
                  value={autocompleteValue}
                  onValueChange={setAutocompleteValue}
                  placeholder="Pick a fruit"
                  searchPlaceholder="Search fruits…"
                  emptyMessage="No fruit found."
                />
              </div>
            </div>

            <Separator />

            {/* Textarea */}
            <div className="space-y-2">
              <Label htmlFor="demo-textarea">Description</Label>
              <Textarea id="demo-textarea" placeholder="Write a product description…" rows={3} />
            </div>

            <Separator />

            {/* Checkboxes & Switches */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                <Label className="text-xs text-muted-foreground">Checkboxes</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="check-a" checked={checkA} onCheckedChange={(v) => setCheckA(!!v)} />
                  <Label htmlFor="check-a" className="font-normal">Enable notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="check-b" checked={checkB} onCheckedChange={(v) => setCheckB(!!v)} />
                  <Label htmlFor="check-b" className="font-normal">Accept terms</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="check-c" disabled />
                  <Label htmlFor="check-c" className="font-normal text-muted-foreground">Disabled option</Label>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-xs text-muted-foreground">Switches</Label>
                <div className="flex items-center justify-between">
                  <Label htmlFor="switch-a" className="font-normal">Dark mode</Label>
                  <Switch id="switch-a" checked={switchA} onCheckedChange={setSwitchA} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="switch-b" className="font-normal">Email alerts</Label>
                  <Switch id="switch-b" checked={switchB} onCheckedChange={setSwitchB} />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="font-normal text-muted-foreground">Disabled</Label>
                  <Switch disabled />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* ── Date Pickers ─────────────────────────────────────────────────── */}
      <Section title="Date Pickers" description="Single date, date range, and date-time pickers.">
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="space-y-2">
                <Label>Single Date</Label>
                <DatePicker value={dateValue} onChange={setDateValue} placeholder="Pick a date" />
                {dateValue && (
                  <p className="text-xs text-muted-foreground">Selected: {dateValue.toLocaleDateString()}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Date Range</Label>
                <DateRangePicker
                  value={dateRangeValue}
                  onChange={setDateRangeValue}
                  placeholder="Select date range"
                  numberOfMonths={1}
                />
                {dateRangeValue?.from && (
                  <p className="text-xs text-muted-foreground">
                    {dateRangeValue.from.toLocaleDateString()}{dateRangeValue.to ? ` – ${dateRangeValue.to.toLocaleDateString()}` : " – …"}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Date &amp; Time</Label>
                <DateTimePicker value={dateTimeValue} onChange={setDateTimeValue} placeholder="Pick date &amp; time" />
                {dateTimeValue && (
                  <p className="text-xs text-muted-foreground">Selected: {dateTimeValue.toLocaleString()}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* ── Badges ───────────────────────────────────────────────────────── */}
      <Section title="Badges" description="Status indicators and labels.">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
            <Separator />
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200"><CheckCircle2 className="h-3 w-3 mr-1" /> Active</Badge>
              <Badge className="bg-amber-100 text-amber-700 border-amber-200"><AlertTriangle className="h-3 w-3 mr-1" /> Pending</Badge>
              <Badge className="bg-rose-100 text-rose-700 border-rose-200"><XCircle className="h-3 w-3 mr-1" /> Cancelled</Badge>
              <Badge className="bg-sky-100 text-sky-700 border-sky-200"><Zap className="h-3 w-3 mr-1" /> Processing</Badge>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* ── Cards ────────────────────────────────────────────────────────── */}
      <Section title="Cards" description="Content containers with various layouts.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
              <CardDescription>Monthly recurring revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">RM 45,231</p>
              <p className="text-xs text-emerald-600 mt-1">+20.1% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>Orders processed this week</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">2,350</p>
              <p className="text-xs text-emerald-600 mt-1">+12.5% from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Users</CardTitle>
              <CardDescription>Currently online</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">573</p>
              <p className="text-xs text-muted-foreground mt-1">Across all platforms</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">View Details</Button>
            </CardFooter>
          </Card>
        </div>
      </Section>

      {/* ── Alerts ───────────────────────────────────────────────────────── */}
      <Section title="Alerts" description="Contextual feedback messages.">
        <div className="space-y-3">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>Your account has been created. Check your email for verification.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>There was a problem processing your request. Please try again.</AlertDescription>
          </Alert>
        </div>
      </Section>

      {/* ── Avatars ──────────────────────────────────────────────────────── */}
      <Section title="Avatars" description="User profile representations.">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">JS</AvatarFallback>
              </Avatar>
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-emerald-100 text-emerald-700 text-sm font-bold">AB</AvatarFallback>
              </Avatar>
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-violet-100 text-violet-700 font-bold">CK</AvatarFallback>
              </Avatar>
              <Avatar className="h-14 w-14">
                <AvatarFallback className="bg-amber-100 text-amber-700 text-lg font-bold">MR</AvatarFallback>
              </Avatar>

              <Separator orientation="vertical" className="h-10 mx-2" />

              {/* Stacked avatars */}
              <div className="flex -space-x-3">
                {["JS", "AB", "CK", "MR", "+3"].map((init, i) => (
                  <Avatar key={i} className="h-9 w-9 border-2 border-background">
                    <AvatarFallback className={i === 4 ? "bg-muted text-muted-foreground text-xs" : "bg-primary text-primary-foreground text-xs font-bold"}>
                      {init}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* ── Toast ────────────────────────────────────────────────────────── */}
      <Section title="Toast Notifications" description="Feedback messages triggered by user actions.">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={() => toast.success("Changes saved successfully!")}>
                <Check className="h-4 w-4 mr-2" /> Success
              </Button>
              <Button variant="outline" onClick={() => toast.error("Something went wrong. Please try again.")}>
                <XCircle className="h-4 w-4 mr-2" /> Error
              </Button>
              <Button variant="outline" onClick={() => toast.info("New update available. Refresh to apply.")}>
                <Info className="h-4 w-4 mr-2" /> Info
              </Button>
              <Button variant="outline" onClick={() => toast.warning("Your session will expire in 5 minutes.")}>
                <AlertTriangle className="h-4 w-4 mr-2" /> Warning
              </Button>
              <Button variant="outline" onClick={() => {
                toast.promise(
                  new Promise((resolve) => setTimeout(resolve, 2000)),
                  { loading: "Processing…", success: "Done!", error: "Failed." }
                );
              }}>
                <Spinner className="h-4 w-4 mr-2" /> Promise
              </Button>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* ── Tabs ─────────────────────────────────────────────────────────── */}
      <Section title="Tabs" description="Organized tabbed content areas.">
        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-4">
                <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                  Overview content — display key metrics and summaries here.
                </div>
              </TabsContent>
              <TabsContent value="analytics" className="mt-4">
                <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                  Analytics content — charts and graphs go here.
                </div>
              </TabsContent>
              <TabsContent value="reports" className="mt-4">
                <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                  Reports content — downloadable reports and summaries.
                </div>
              </TabsContent>
              <TabsContent value="notifications" className="mt-4">
                <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                  Notifications content — configure alerts and preferences.
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </Section>

      {/* ── Stepper ──────────────────────────────────────────────────────── */}
      <Section title="Stepper" description="Multi-step progress indicator with navigation.">
        <Card>
          <CardContent className="pt-6">
            <Stepper value={stepperValue} onValueChange={setStepperValue}>
              <div className="flex items-center gap-2 mb-6">
                <StepperItem step={1} completed={stepperValue > 1}>
                  <StepperTrigger>
                    <StepperIndicator>1</StepperIndicator>
                  </StepperTrigger>
                  <StepperSeparator />
                </StepperItem>
                <StepperItem step={2} completed={stepperValue > 2}>
                  <StepperTrigger>
                    <StepperIndicator>2</StepperIndicator>
                  </StepperTrigger>
                  <StepperSeparator />
                </StepperItem>
                <StepperItem step={3} completed={stepperValue > 3}>
                  <StepperTrigger>
                    <StepperIndicator>3</StepperIndicator>
                  </StepperTrigger>
                  <StepperSeparator />
                </StepperItem>
                <StepperItem step={4}>
                  <StepperTrigger>
                    <StepperIndicator>4</StepperIndicator>
                  </StepperTrigger>
                </StepperItem>
              </div>

              <StepperContent value={1}>
                <div className="rounded-lg border border-dashed p-6 text-center space-y-2">
                  <h3 className="font-semibold">Step 1: Account Details</h3>
                  <p className="text-sm text-muted-foreground">Enter your name, email, and password.</p>
                </div>
              </StepperContent>
              <StepperContent value={2}>
                <div className="rounded-lg border border-dashed p-6 text-center space-y-2">
                  <h3 className="font-semibold">Step 2: Business Information</h3>
                  <p className="text-sm text-muted-foreground">Provide your company name and address.</p>
                </div>
              </StepperContent>
              <StepperContent value={3}>
                <div className="rounded-lg border border-dashed p-6 text-center space-y-2">
                  <h3 className="font-semibold">Step 3: Preferences</h3>
                  <p className="text-sm text-muted-foreground">Configure your notification and display preferences.</p>
                </div>
              </StepperContent>
              <StepperContent value={4}>
                <div className="rounded-lg border border-dashed p-6 text-center space-y-2">
                  <h3 className="font-semibold">Step 4: Review & Confirm</h3>
                  <p className="text-sm text-muted-foreground">Review your information and submit.</p>
                </div>
              </StepperContent>

              <div className="flex justify-between mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={stepperValue <= 1}
                  onClick={() => setStepperValue(stepperValue - 1)}
                >
                  Previous
                </Button>
                <Button
                  size="sm"
                  disabled={stepperValue >= 4}
                  onClick={() => setStepperValue(stepperValue + 1)}
                >
                  Next <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </Stepper>
          </CardContent>
        </Card>
      </Section>

      {/* ── Dialog ───────────────────────────────────────────────────────── */}
      <Section title="Dialogs & Sheets" description="Modal overlays and slide-out panels.">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline"><Layers className="h-4 w-4 mr-2" /> Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Action</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to proceed? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Confirm</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline"><Settings className="h-4 w-4 mr-2" /> Open Sheet</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Settings Panel</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <Label>Store Name</Label>
                      <Input defaultValue="ModernStores" />
                    </div>
                    <div className="space-y-2">
                      <Label>Contact Email</Label>
                      <Input defaultValue="hello@modernstores.com" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Notifications</Label>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <Button className="w-full">Save Changes</Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* ── Dropdowns & Tooltips ─────────────────────────────────────────── */}
      <Section title="Dropdowns & Tooltips" description="Context menus and hover information.">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <User className="h-4 w-4 mr-2" /> Account <MoreHorizontal className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem><User className="h-4 w-4 mr-2" /> Profile</DropdownMenuItem>
                  <DropdownMenuItem><Settings className="h-4 w-4 mr-2" /> Settings</DropdownMenuItem>
                  <DropdownMenuItem><Bell className="h-4 w-4 mr-2" /> Notifications</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><Share2 className="h-4 w-4 mr-2" /> Share</DropdownMenuItem>
                  <DropdownMenuItem><Copy className="h-4 w-4 mr-2" /> Copy Link</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" /> Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <TooltipProvider>
                <div className="flex gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon"><Heart className="h-4 w-4" /></Button>
                    </TooltipTrigger>
                    <TooltipContent>Add to favorites</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon"><Star className="h-4 w-4" /></Button>
                    </TooltipTrigger>
                    <TooltipContent>Rate this item</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon"><ShieldCheck className="h-4 w-4" /></Button>
                    </TooltipTrigger>
                    <TooltipContent>Verified & secure</TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* ── Skeleton & Spinners ──────────────────────────────────────────── */}
      <Section title="Loading States" description="Skeleton placeholders and spinners.">
        <Card>
          <CardContent className="pt-6 space-y-6">
            <div>
              <Label className="text-xs text-muted-foreground mb-3 block">Skeleton</Label>
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <Label className="text-xs text-muted-foreground mb-3 block">Spinner</Label>
              <div className="flex items-center gap-6">
                <Spinner />
                <span className="text-sm text-muted-foreground">Loading data…</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* ── Theme Toggle ─────────────────────────────────────────────────── */}
      <Section title="Theme Toggle" description="Switch between light and dark mode.">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <span className="text-sm text-muted-foreground">Click to toggle between light and dark mode.</span>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* ── Checkbox Groups ───────────────────────────────────────────── */}
      <Section title="Checkbox Groups" description="Grouped checkboxes in vertical, horizontal, and card layouts.">
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Vertical */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Notifications</CardTitle>
              <CardDescription className="text-xs">Vertical group</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { id: "notif-email", label: "Email" },
                { id: "notif-sms", label: "SMS" },
                { id: "notif-push", label: "Push notifications" },
                { id: "notif-slack", label: "Slack", disabled: true },
              ].map(({ id, label, disabled }) => (
                <div key={id} className="flex items-center gap-2">
                  <Checkbox id={id} disabled={disabled} defaultChecked={id === "notif-email"} />
                  <Label htmlFor={id} className={cn("font-normal text-sm", disabled && "text-muted-foreground")}>{label}</Label>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Horizontal */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Permissions</CardTitle>
              <CardDescription className="text-xs">Horizontal group</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {[
                  { id: "perm-read", label: "Read" },
                  { id: "perm-write", label: "Write" },
                  { id: "perm-delete", label: "Delete" },
                  { id: "perm-admin", label: "Admin", disabled: true },
                ].map(({ id, label, disabled }) => (
                  <div key={id} className="flex items-center gap-2">
                    <Checkbox id={id} disabled={disabled} defaultChecked={id === "perm-read"} />
                    <Label htmlFor={id} className={cn("font-normal text-sm", disabled && "text-muted-foreground")}>{label}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Card style */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Features</CardTitle>
              <CardDescription className="text-xs">Card-style checkboxes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { id: "feat-analytics", label: "Analytics", desc: "Track user activity" },
                { id: "feat-api", label: "API Access", desc: "Connect external apps" },
                { id: "feat-export", label: "Data Export", desc: "Download CSV / JSON", disabled: true },
              ].map(({ id, label, desc, disabled }) => (
                <label
                  key={id}
                  htmlFor={id}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50",
                    disabled && "cursor-not-allowed opacity-60"
                  )}
                >
                  <Checkbox id={id} disabled={disabled} className="mt-0.5" defaultChecked={id === "feat-analytics"} />
                  <div className="leading-tight">
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </label>
              ))}
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* ── Radio Groups ─────────────────────────────────────────────────── */}
      <Section title="Radio Groups" description="Mutually exclusive selection in vertical, horizontal, and card layouts.">
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Vertical */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Plan</CardTitle>
              <CardDescription className="text-xs">Vertical group</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="pro" className="gap-3">
                {[
                  { value: "free", label: "Free" },
                  { value: "pro", label: "Pro" },
                  { value: "business", label: "Business" },
                  { value: "enterprise", label: "Enterprise", disabled: true },
                ].map(({ value, label, disabled }) => (
                  <div key={value} className="flex items-center gap-2">
                    <RadioGroupItem value={value} id={`plan-${value}`} disabled={disabled} />
                    <Label htmlFor={`plan-${value}`} className={cn("font-normal text-sm", disabled && "text-muted-foreground")}>{label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Horizontal */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Priority</CardTitle>
              <CardDescription className="text-xs">Horizontal group</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="medium" className="flex flex-wrap gap-4">
                {[
                  { value: "low", label: "Low" },
                  { value: "medium", label: "Medium" },
                  { value: "high", label: "High" },
                  { value: "critical", label: "Critical", disabled: true },
                ].map(({ value, label, disabled }) => (
                  <div key={value} className="flex items-center gap-2">
                    <RadioGroupItem value={value} id={`pri-${value}`} disabled={disabled} />
                    <Label htmlFor={`pri-${value}`} className={cn("font-normal text-sm", disabled && "text-muted-foreground")}>{label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Card style */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Billing Cycle</CardTitle>
              <CardDescription className="text-xs">Card-style radio</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="annual" className="gap-2">
                {[
                  { value: "monthly", label: "Monthly", desc: "Billed every month" },
                  { value: "annual", label: "Annual", desc: "Save 20% per year" },
                  { value: "lifetime", label: "Lifetime", desc: "Contact sales", disabled: true },
                ].map(({ value, label, desc, disabled }) => (
                  <label
                    key={value}
                    htmlFor={`bill-${value}`}
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50",
                      disabled && "cursor-not-allowed opacity-60"
                    )}
                  >
                    <RadioGroupItem value={value} id={`bill-${value}`} disabled={disabled} className="mt-0.5" />
                    <div className="leading-tight">
                      <p className="text-sm font-medium">{label}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* ── DataTable ────────────────────────────────────────────────────── */}
      <Section title="Data Table" description="Full-featured table with sorting, filtering, pagination, and row selection.">
        <div className="min-w-0 overflow-hidden">
        <DataTable
          title="Team Members"
          columns={userColumns}
          data={SAMPLE_USERS}
          globalSearchColumn="name"
          globalSearchPlaceholder="Search by name…"
          filters={[
            {
              columnId: "role",
              title: "Role",
              options: [
                { label: "Admin", value: "Admin" },
                { label: "Editor", value: "Editor" },
                { label: "Viewer", value: "Viewer" },
              ],
            },
            {
              columnId: "status",
              title: "Status",
              options: [
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
                { label: "Pending", value: "pending" },
              ],
            },
          ]}
          pageSizes={[5, 10, 25]}
        />
        </div>
      </Section>

      {/* ── Toolbar ── */}
      <Section
        title="Toolbar"
        description="Figma-inspired animated action toolbar — click items to expand labels, toggle the lock/edit button."
      >
        <div className="flex flex-col items-center gap-8 py-6">
          <Toolbar />
        </div>
      </Section>

      {/* ── Rich Text Editor ── */}
      <Section
        title="Rich Text Editor"
        description="Full-featured Tiptap editor with toolbar, floating menu, image upload, search & replace, and more."
      >
        <RichTextEditorDemo />
      </Section>

      {/* ── Spotlight Cards ── */}
      <Section
        title="Spotlight Cards"
        description="Feature cards with magnetic 3D tilt, aurora glow, shimmer sweep, and focus-dim siblings."
      >
        <SpotlightCards />
      </Section>

      {/* ── Bento Grid ── */}
      <Section
        title="Bento Grid"
        description="Mosaic grid with staggered entrance, 3D tilt hover, typing animation, metrics bars, and integration icons."
      >
        <BentoGrid />
      </Section>

      {/* ── Profile Dropdown ── */}
      <Section
        title="Profile Dropdown"
        description="User profile trigger with gradient avatar ring, bending-line indicator, plan badge, and sign-out."
      >
        <div className="flex justify-center py-6">
          <ProfileDropdown />
        </div>
      </Section>

      {/* ── Timeline ── */}
      <Section
        title="Timeline"
        description="Step-by-step process tracker with vertical and horizontal orientations."
      >
        <Card>
          <CardContent className="pt-6 grid gap-10 sm:grid-cols-2">
            <div>
              <Label className="text-xs text-muted-foreground mb-4 block">Vertical (default)</Label>
              <Timeline defaultValue={3}>
                {([
                  { step: 1, date: "Jan 2024", title: "Order Placed", content: "Your order #4521 was received." },
                  { step: 2, date: "Jan 2024", title: "Processing", content: "Payment confirmed and items packed." },
                  { step: 3, date: "Feb 2024", title: "Shipped", content: "Package dispatched via express courier." },
                  { step: 4, date: "Feb 2024", title: "Delivered", content: "Awaiting delivery to your address." },
                ] as const).map(({ step, date, title, content }) => (
                  <TimelineItem key={step} step={step}>
                    <TimelineIndicator />
                    <TimelineSeparator />
                    <TimelineHeader>
                      <TimelineDate>{date}</TimelineDate>
                      <TimelineTitle>{title}</TimelineTitle>
                    </TimelineHeader>
                    <TimelineContent>{content}</TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-4 block">Horizontal</Label>
              <Timeline defaultValue={2} orientation="horizontal">
                {["Cart", "Shipping", "Payment", "Review"].map((label, i) => (
                  <TimelineItem key={label} step={i + 1}>
                    <TimelineIndicator />
                    <TimelineSeparator />
                    <TimelineTitle>{label}</TimelineTitle>
                  </TimelineItem>
                ))}
              </Timeline>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* ── Date Selector ── */}
      <Section
        title="Date Selector"
        description="Advanced date picker with day / month / quarter / half-year / year modes and range support."
      >
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <Label className="text-xs text-muted-foreground">
                Selected:{" "}
                {dateSelectorValue
                  ? `${dateSelectorValue.period} · ${dateSelectorValue.operator}`
                  : "none"}
              </Label>
              <DateSelector
                label="Filter date"
                value={dateSelectorValue}
                onChange={setDateSelectorValue}
                allowRange
              />
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* ── Button Group ── */}
      <Section
        title="Button Group"
        description="Grouped buttons with automatic border handling and multiple orientations."
      >
        <Card>
          <CardContent className="pt-6 space-y-6">
            <div>
              <Label className="text-xs text-muted-foreground mb-3 block">Horizontal (default)</Label>
              <div className="flex flex-wrap gap-4">
                <ButtonGroup>
                  <Button variant="outline">Left</Button>
                  <Button variant="outline">Center</Button>
                  <Button variant="outline">Right</Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button variant="outline" size="icon"><Minus className="h-4 w-4" /></Button>
                  <Button variant="outline" size="icon"><Plus className="h-4 w-4" /></Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button variant="outline"><Download className="h-4 w-4 mr-2" />Export</Button>
                  <Button variant="outline"><Upload className="h-4 w-4 mr-2" />Import</Button>
                  <Button variant="outline"><Share2 className="h-4 w-4 mr-2" />Share</Button>
                </ButtonGroup>
              </div>
            </div>

            <Separator />

            <div>
              <Label className="text-xs text-muted-foreground mb-3 block">Vertical</Label>
              <div className="flex flex-wrap gap-4">
                <ButtonGroup orientation="vertical">
                  <Button variant="outline"><Eye className="h-4 w-4 mr-2" />Preview</Button>
                  <Button variant="outline"><Pencil className="h-4 w-4 mr-2" />Edit</Button>
                  <Button variant="outline"><Copy className="h-4 w-4 mr-2" />Duplicate</Button>
                  <Button variant="outline" className="text-destructive"><Trash2 className="h-4 w-4 mr-2" />Delete</Button>
                </ButtonGroup>
                <ButtonGroup orientation="vertical">
                  <Button variant="outline">Top</Button>
                  <Button variant="outline">Middle</Button>
                  <Button variant="outline">Bottom</Button>
                </ButtonGroup>
              </div>
            </div>

            <Separator />

            <div>
              <Label className="text-xs text-muted-foreground mb-3 block">Full width</Label>
              <ButtonGroup fullWidth>
                <Button variant="outline">Option A</Button>
                <Button variant="outline">Option B</Button>
                <Button variant="outline">Option C</Button>
              </ButtonGroup>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* ── Multi-Select ── */}
      <Section
        title="Multi-Select with Images"
        description="Select multiple items with avatar images and multi-line descriptions."
      >
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2 max-w-md">
              <Label>Assign Team Members</Label>
              <MultiSelect
                options={TEAM_MEMBERS}
                value={multiSelectValue}
                onValueChange={setMultiSelectValue}
                placeholder="Select team members…"
                searchPlaceholder="Search members…"
                emptyMessage="No team members found."
              />
              {multiSelectValue.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  Selected {multiSelectValue.length} member{multiSelectValue.length !== 1 ? "s" : ""}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* ── Command Palette ── */}
      <Section
        title="Command Palette"
        description="Keyboard-driven command menu for quick navigation and actions. Press ⌘K or Ctrl+K to open."
      >
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => setCommandOpen(true)}>
                <Search className="h-4 w-4 mr-2" /> Open Command Palette
              </Button>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>

            <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
              <CommandInput placeholder="Type a command or search…" />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem>
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Calendar</span>
                  </CommandItem>
                  <CommandItem>
                    <Smile className="mr-2 h-4 w-4" />
                    <span>Search Emoji</span>
                  </CommandItem>
                  <CommandItem>
                    <Calculator className="mr-2 h-4 w-4" />
                    <span>Calculator</span>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                  <CommandItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </CommandItem>
                  <CommandItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                  </CommandItem>
                  <CommandItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </CommandDialog>
          </CardContent>
        </Card>
      </Section>

      {/* ── Context Menu ── */}
      <Section
        title="Context Menu"
        description="Right-click menu with actions, checkboxes, radio groups, and keyboard shortcuts."
      >
        <Card>
          <CardContent className="pt-6">
            <ContextMenu>
              <ContextMenuTrigger asChild>
                <div className="flex h-40 w-full items-center justify-center rounded-lg border border-dashed bg-muted/30">
                  <div className="text-center">
                    <p className="text-sm font-medium">Right-click here</p>
                    <p className="text-xs text-muted-foreground mt-1">Open context menu</p>
                  </div>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-56">
                <ContextMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>New File</span>
                  <ContextMenuShortcut>⌘N</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                  <Folder className="mr-2 h-4 w-4" />
                  <span>New Folder</span>
                  <ContextMenuShortcut>⇧⌘N</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>
                  <Copy className="mr-2 h-4 w-4" />
                  <span>Copy</span>
                  <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                  <Share2 className="mr-2 h-4 w-4" />
                  <span>Share</span>
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuCheckboxItem
                  checked={contextMenuChecked}
                  onCheckedChange={setContextMenuChecked}
                >
                  <span>Show Hidden Files</span>
                </ContextMenuCheckboxItem>
                <ContextMenuSeparator />
                <ContextMenuLabel>View Mode</ContextMenuLabel>
                <ContextMenuRadioGroup value={contextMenuRadio} onValueChange={setContextMenuRadio}>
                  <ContextMenuRadioItem value="compact">Compact</ContextMenuRadioItem>
                  <ContextMenuRadioItem value="comfortable">Comfortable</ContextMenuRadioItem>
                  <ContextMenuRadioItem value="spacious">Spacious</ContextMenuRadioItem>
                </ContextMenuRadioGroup>
                <ContextMenuSeparator />
                <ContextMenuItem className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                  <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </CardContent>
        </Card>
      </Section>

      {/* ── Tree ── */}
      <Section
        title="Tree"
        description="Keyboard-navigable file/folder tree powered by headless-tree with expand/collapse."
      >
        <Card>
          <CardContent className="pt-6">
            <Tree tree={tree} className="max-w-xs border rounded-md p-2">
              {tree.getItems().map((item) => (
                <TreeItem key={item.getId()} item={item}>
                  <TreeItemLabel />
                </TreeItem>
              ))}
            </Tree>
          </CardContent>
        </Card>
      </Section>
    </div>
  );
}

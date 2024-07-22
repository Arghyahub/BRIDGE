// import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  //   DialogFooter,
  DialogHeader,
  DialogTitle,
  //   DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  Title: string;
  data: Object;
}

export default function DataDialog({ Title, data }: Props) {
  return (
    <Dialog defaultOpen={true}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{Title}</DialogTitle>
          <DialogDescription>Data</DialogDescription>
        </DialogHeader>
        <div className="gap-4 grid py-4 max-w-full overflow-auto">
          {JSON.stringify(data)}
        </div>
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

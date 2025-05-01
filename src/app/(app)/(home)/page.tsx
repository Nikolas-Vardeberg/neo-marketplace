import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div>
      <Button variant="elevated">
        Button
      </Button>
      <Input placeholder="Hei" />
      <Progress value={50} />
      <Textarea placeholder="textarea" />
    </div>
  );
}

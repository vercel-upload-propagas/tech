import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PostCardProps {
  id: string;
  title: string;
  description: string;
  readTime: number;
  date: string;
  image: string;
  href?: string;
}

export function PostCard({
  title,
  description,
  readTime,
  date,
  image,
  href = "#",
}: PostCardProps) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      <Link
        href={href}
        className="flex flex-1 flex-col"
        aria-label={`Ler mais sobre: ${title}`}
      >
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <CardHeader className="flex-1">
          <div className="mb-2 flex items-center gap-3 text-xs text-muted-foreground">
            <time dateTime={date} className="flex items-center gap-1">
              <span aria-hidden="true">⏱</span>
              <span>{readTime}</span>
            </time>
            <span aria-hidden="true" className="text-muted-foreground/50">
              •
            </span>
            <time dateTime={date}>{date}</time>
          </div>
          <CardTitle className="line-clamp-2 transition-colors group-hover:text-primary">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-2 mt-2">
            {description}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button
            variant="ghost"
            size="sm"
            className="group-hover:text-primary"
            aria-hidden="true"
            tabIndex={-1}
          >
            Ler mais →
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}

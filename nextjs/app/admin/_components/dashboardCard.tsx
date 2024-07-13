import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface cardProps {
  title: string;
  subtitle: string;
  content?: string;
}

function DashboardCard(props: cardProps) {
  return (
    <>
      <Card className="p-4 bg-customColors-white text-customColors-black border-customColors-black hover:bg-slate-400">
        <CardHeader className="">
          <CardTitle>{props.title}</CardTitle>
          <CardDescription className="text-customColors-red">
            {props.subtitle}
          </CardDescription>
        </CardHeader>
        {props.content ? (
          <CardContent className="">
            <p>{props.content}</p>
          </CardContent>
        ) : null}
      </Card>
    </>
  );
}

export default DashboardCard;

"use client";
import { Prisma } from "@prisma/client";
import axios from "axios";
import { BookOpen, Clock } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

type Group = Prisma.GroupGetPayload<{
  include: {
    topics: true;
  };
}>;

const Discover = () => {
  const { id } = useParams();
  const [group, setGroup] = useState<Group | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (id) {
      axios.get("/api/group/" + id).then((res) => {
        setGroup(res.data);
      });
    }
  }, [id]);

  if (!group) return <>Group not found!</>

  return (
    <div className="max-w-3xl justify-between mx-auto mt-28 p-6">
      <Link href={`groups/${id}/create`}>
        <div className="flex-1 max-w-2xl p-4 bg-purple-100 rounded-xl text-center mb-12 ">
          <h2 className="font-semibold text-lg hover:cursor-pointer ">
            Start a Lesson
          </h2>
          <p className="text-sm text-gray-600">Learn something new!</p>
        </div>
      </Link>

      <ul className="space-y-4">
        {group.topics.map((topic, index) => (
          <li
            key={index}
            className="flex justify-between items-center gap-2 hover:cursor-pointer p-4 bg-gray-50 border rounded-lg shadow"
            onClick={() => {
              router.push(`/topics/${topic.id}/summary`);
            }}
          >
            <div className="flex items-center gap-3 ">
              <BookOpen className="text-purple-600 w-5 h-5" />
              <div>
                <p className="font-semibold">{topic.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Clock className="w-4 h-4" />
              <span>{dayjs(topic.createdAt).format("YYYY-MM-DD HH:mm")}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default Discover;

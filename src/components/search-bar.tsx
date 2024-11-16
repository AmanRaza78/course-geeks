"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const [searchQuery, setSearchQUery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ query: searchQuery });
    router.push(`?${params.toString()}`);
  };
  return (
    <form onSubmit={handleSearch} className="flex gap-x-2">
      <Input
        type="text"
        placeholder="Search auctions by name"
        value={searchQuery}
        onChange={(e) => setSearchQUery(e.target.value)}
      />
      <Button type="submit">Search</Button>
    </form>
  );
}

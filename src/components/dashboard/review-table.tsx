import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface ReviewWithDetails {
  averageRating: number;
  id: string;
  coursename: string;
  coursedescription: string;
  createdAt: Date;
  user: {
      firstname: string;
      lastname: string;
      profilepic: string;
  };
}


interface ReviewTableProps {
  reviews: ReviewWithDetails[];
}


export default function ReviewTable({reviews}:ReviewTableProps){
    return(
        
    <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Review ID</TableHead>
        <TableHead>Title</TableHead>
        <TableHead>Rating</TableHead>
        <TableHead>Description</TableHead>
        <TableHead>Reviewer</TableHead>
        <TableHead className="text-right">Date</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {reviews.map((review) => (
        <TableRow key={review.id}>
          <TableCell className="font-medium">{review.id.slice(0,5)}</TableCell>
          <TableCell>{review.coursename}</TableCell>
          <TableCell>{review.averageRating}</TableCell>
          <TableCell>{review.coursedescription.slice(0,20)}</TableCell>
          <TableCell>{review.user.firstname}{review.user.lastname}</TableCell>
          <TableCell className="text-right">{review.createdAt.toLocaleDateString()}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
    )
}
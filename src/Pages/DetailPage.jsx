import { Link, useParams } from "react-router-dom";

function DetailPage() {
  const param = useParams();
  return (
    <>
      <h1>Detail Page</h1>
      <p>This is the detail page for record with ID {param.recordId}</p>
      <Link to="/track">Back to Track Page</Link>
    </>
  );
}

export default DetailPage;

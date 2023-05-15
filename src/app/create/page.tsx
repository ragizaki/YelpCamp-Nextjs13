export default function CreateCampsite() {
  return (
    <form className="flex flex-col space-y-4">
      <input type="text" placeholder="Name" name="name" />
      <input type="text" placeholder="Description" name="description" />
      <input type="text" placeholder="City" name="city" />
      <input type="text" placeholder="Country" name="country" />
      <input type="number" placeholder="Price/night" name="price" />
    </form>
  );
}

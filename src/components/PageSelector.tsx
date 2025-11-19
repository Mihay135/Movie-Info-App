export default function () {
  const message: string = "prev <- | ... 3 4 5 [6] 7 8 9 ... 20 | -> next";
  return (
    <>
      <div className="Footer w-full h-auto bg-[#171b26] sticky bottom-8 align-middle z-20 pt-2 pb-2">
        <p className="Footer__paragraph-message w-[30%] h-[80%] bg-[#171b26] text-center text-[#ffffffc8] ml-auto mr-auto rounded-t-md">
          {message}
        </p>
      </div>
    </>
  );
}

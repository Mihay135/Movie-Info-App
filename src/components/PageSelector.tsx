export default function () {
  const message: string = "prev <- | ... 3 4 5 [6] 7 8 9 ... 20 | -> next";
  return (
    <>
      <div className="Footer w-full h-[10%] bg-[#171b26] sticky bottom-6 align-middle z-10 pt-2">
        <p className="Footer__paragraph-message w-[30%] h-[90%] bg-[#171b26] text-center text-[#ffffffc8] ml-auto mr-auto rounded-t-md">
          {message}
        </p>
      </div>
    </>
  );
}

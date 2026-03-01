import Skeleton from "@/components/core/skeleton";

function ModalLoader() {
  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <Skeleton width="100%" height={"240px"} />
      </div>
      <div className="grid grid-cols-2 mt-3 justify-between gap-4">
        <Skeleton width="120px" height="40px" />
        <Skeleton width="120px%" height="40px" />
      </div>
    </>
  );
}

export default ModalLoader;

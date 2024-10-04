"use client";
import { usePayment } from "@/hooks/payment.hook";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Spinner } from "@nextui-org/spinner";
import {
  BadgeCheck,
  BookOpenIcon,
  HeartIcon,
  IndianRupee,
  PawPrintIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function MonetizationModal({
  className,
}: {
  className?: string;
}) {
  const router = useRouter();
  const { mutate: createPayment, data, isSuccess, isPending } = usePayment();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handlePayment = async () => {
    await createPayment("1000");
  };

  if (data?.paymentSession?.payment_url) {
    router.push(data?.paymentSession?.payment_url);
  }

  return (
    <>
      <Button
        onPress={onOpen}
        className={`bg-primary text-white ${className}`}
        endContent={<BadgeCheck />}
      >
        On Monetization
      </Button>
      <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex gap-1 items-center px-16 pt-4">
                Premium Access <BadgeCheck />
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-10 px-10">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">What you will get:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <PawPrintIcon className="mr-2 h-4 w-4" />
                        Expert pet care tips
                      </li>
                      <li className="flex items-center">
                        <HeartIcon className="mr-2 h-4 w-4" />
                        Create premium your pet stories
                      </li>
                      <li className="flex items-center">
                        <BookOpenIcon className="mr-2 h-4 w-4" />
                        Access to premium posts
                      </li>
                    </ul>
                    <div className="text-2xl font-bold">
                      Only 1000 BDT/lifetime
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center space-y-4">
                    <Button
                      endContent={<IndianRupee />}
                      className="w-full bg-green-400"
                      size="lg"
                      onClick={handlePayment}
                    >
                      {isPending ? <Spinner /> : "Pay Now 1000 BDT"}
                    </Button>
                    <p className="text-sm text-center text-muted-foreground">
                      Secure payment powered by Amar Pay
                    </p>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

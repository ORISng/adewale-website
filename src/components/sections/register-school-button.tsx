"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import RegistrationModal from "./registration-modal";

export default function RegisterSchoolButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="default"
        className="py-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        Register Your School
      </Button>
      <RegistrationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

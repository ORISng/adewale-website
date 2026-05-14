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
        className="py-6"
        onClick={() => setIsOpen(true)}
      >
        Register Your School — Opens May 1st
      </Button>
      <RegistrationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

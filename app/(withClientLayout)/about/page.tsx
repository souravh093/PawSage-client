import { Card } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

export default function AboutUs() {
  return (
    <Card className="max-w-7xl mx-auto my-12 p-8 shadow-none">
      <h2 className="text-3xl font-semibold text-center mb-6">About PawSage</h2>
      <Divider className="my-6" />

      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-medium mb-3">Our Story</h3>
          <p className="text-gray-600">
            PawSage was founded by a group of dedicated pet enthusiasts with a
            shared vision: to create a comprehensive resource for pet owners
            that combines expert advice with heartwarming stories. Our platform
            has since grown into a trusted source of information and inspiration
            for animal lovers worldwide.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-medium mb-3">Our Mission</h3>
          <p className="text-gray-600">
            PawSage, our mission is to empower pet owners with knowledge and
            inspiration, ensuring that every furry, feathered, or scaly friend
            receives the best care possible. We strive to strengthen the bond
            between humans and their animal companions through practical tips,
            expert insights, and touching narratives.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-medium mb-3">Our Team</h3>
          <p className="text-gray-600">
            Our team consists of experienced veterinarians, certified animal
            behaviorists, and passionate pet owners. This diverse group of
            experts collaborates to bring you accurate, up-to-date, and engaging
            content about pet care and animal companionship. From our writers
            and editors to our community moderators, every team member is
            committed to our mission of improving the lives of pets and their
            owners.
          </p>
        </section>

        <Divider className="my-6" />

        <section>
          <h3 className="text-xl font-medium mb-3">Our Vision</h3>
          <p className="text-gray-600">
            We envision a world where every pet owner is equipped with the
            knowledge and inspiration to provide the best possible care for
            their animal companions. Through our platform, we aim to foster a
            community where pet lovers can learn, share experiences, and grow
            together. By promoting responsible pet ownership and celebrating the
            human-animal bond, we strive to contribute to a society where pets
            and their humans lead happier, healthier lives together.
          </p>
        </section>
      </div>

      <Divider className="my-6" />

      <footer className="text-center text-gray-600">
        <p>
          Join us in our commitment to enhancing the lives of pets and their
          human companions through education, inspiration, and community.
        </p>
      </footer>
    </Card>
  );
}

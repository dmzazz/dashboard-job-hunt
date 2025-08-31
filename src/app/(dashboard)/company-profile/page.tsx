import {
  CompanyDialogEmptyData,
  CompanyOverview,
  CompanySocialMedia,
  CompanyTeam,
} from "@/components/organisms/CompanyProfile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authOptions } from "@/lib/authOptions";
import { supabaseGetPublicUrl } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { FC } from "react";
import { BsBuildings, BsPeople } from "react-icons/bs";
import prisma from "../../../../lib/prisma";

type CompanyProfile = {
  id: string;
  name: string;
  email: string;
  CompanyOverview: any[];
  CompanySocialMedia: any[];
  CompanyTeam: any[];
};

interface CompanyProfileProps {}

async function getCompanyProfile() {
  try {
    // Get session
    const session = await getServerSession(authOptions);

    // Check if email exist
    if (!session?.user.email) {
      return console.log("Unauthorized");
    }

    // Retrieve data based on the users email
    const companyProfile = await prisma.company.findMany({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        CompanyOverview: true,
        CompanySocialMedia: true,
        CompanyTeam: true,
      },
    });

    return companyProfile;
  } catch (error) {
    console.error(error);
  }
}

const CompanyProfile: FC<CompanyProfileProps> = async ({}) => {
  const data = await getCompanyProfile();

  // If the data is not available, redirect to the settings page
  if (
    !data ||
    data.length === 0 ||
    data[0].CompanyOverview.length === 0 ||
    data[0].CompanySocialMedia.length === 0 ||
    data[0].CompanyTeam.length === 0
  ) {
    return <CompanyDialogEmptyData />;
  }

  return (
    <>
      {data?.map((item: CompanyProfile) => {
        // Company overview
        const overview = item.CompanyOverview[0];
        const previewImg = overview?.image || "";
        const { publicUrl } = supabaseGetPublicUrl(previewImg, "company");

        // Company social media
        const socialMedia = item?.CompanySocialMedia[0];
        // Company teams
        const teams = item?.CompanyTeam;

        return (
          <div key={item.id}>
            <div className="flex items-center">
              <Image
                src={publicUrl}
                alt={overview?.name || ""}
                width={150}
                height={150}
                loading="lazy"
              />

              {/* Company Name */}
              <div className="ml-5 flex-grow">
                <div className="flex items-center">
                  <BsBuildings className="h-8 w-8 sm:h-14 sm:w-14" />
                  <h2 className="-mb-4 ml-2 text-xl font-bold sm:text-5xl">
                    {overview?.name || ""}
                  </h2>
                </div>
                <h3 className="mt-2 text-lg sm:text-2xl">
                  {overview?.industry || ""}
                </h3>
              </div>
            </div>

            {/* Company Detail */}
            <Tabs defaultValue="overview" className="mt-10">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="socialLinks">Social Links</TabsTrigger>
                <TabsTrigger value="teams">Teams</TabsTrigger>
              </TabsList>
              <div className="rounded-lg border p-4">
                {/* Company overview */}
                <TabsContent value="overview">
                  <div className="mb-10 flex items-center">
                    <BsBuildings className="h-8 w-8" />
                    <h2 className="-mb-2 ml-2 text-lg font-semibold">
                      Company Overview
                    </h2>
                  </div>

                  <CompanyOverview
                    location={overview?.location || ""}
                    employee={overview?.employee || ""}
                    dateFounded={overview?.dateFounded || ""}
                    website={overview?.website || ""}
                    description={overview?.description || ""}
                    techStack={overview?.techStack || ""}
                  />
                </TabsContent>

                {/* Company social media */}
                <TabsContent value="socialLinks">
                  <div className="flex items-center">
                    <BsBuildings className="h-8 w-8" />
                    <h2 className="-mb-2 ml-2 text-lg font-semibold">
                      Social Media
                    </h2>
                  </div>
                  <p className="mb-10 text-gray-500">Our social media</p>

                  <CompanySocialMedia
                    instagram={socialMedia?.instagram || ""}
                    twitter={socialMedia?.twitter || ""}
                    facebook={socialMedia?.facebook || ""}
                    linkedin={socialMedia?.linkedin || ""}
                    youtube={socialMedia?.youtube || ""}
                  />
                </TabsContent>

                {/* Company teams */}
                <TabsContent value="teams">
                  <div className="flex items-center">
                    <BsPeople className="h-8 w-8" />
                    <h2 className="-mb-2 ml-2 text-lg font-semibold">
                      Our Teams
                    </h2>
                  </div>
                  <p className="mb-10 text-gray-500">
                    Meet the pople behind {overview?.name}
                  </p>

                  <div className="flex flex-col gap-10 lg:flex-row">
                    {teams?.map((item: any) => (
                      <CompanyTeam
                        key={item.id}
                        name={item.name}
                        position={item.position}
                        instagram={item.instagram}
                        linkedin={item.linkedin}
                      />
                    ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        );
      })}
    </>
  );
};

export default CompanyProfile;

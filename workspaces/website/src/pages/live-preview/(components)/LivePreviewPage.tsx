import { Box } from "@chakra-ui/react";
import { Category } from "@starknet-io/cms-data/src/categories";
import { Topic } from "@starknet-io/cms-data/src/topics";
import usePreviewData, { CustomPreviewType } from "./usePreviewData";
import EventCard from "src/pages/events/EventCard";
import { isUpcomingEvent } from "src/pages/events/utils";
import JobsCard from "src/pages/jobs/JobsCard";
import TutorialsCard from "src/pages/tutorials/TutorialsCard";
import CMSPage from "src/pages/(components)/CMSPage";
import { ThemeProvider } from "src/renderer/ThemeProvider";
import RoadmapPost from "src/pages/roadmap/@slug/(components)/RoadmapPost";
import { RoadmapVersion } from "@starknet-io/cms-data/src/roadmap";
import RoadmapPostVersion from "src/pages/roadmap/(components)/RoadmapPostVersion";
import { PostPage } from "src/pages/content/@slug/PostPage";
import { LatestAnnouncements } from "@starknet-io/cms-data/src/settings/latest-announcements";

export interface Props {
  readonly categories: readonly Category[];
  readonly latestAnnouncements: LatestAnnouncements[];
  readonly topics: readonly Topic[];
  readonly roadmapVersions: readonly RoadmapVersion[];
}

export default function LivePreviewPage({
  topics,
  categories,
  latestAnnouncements,
  roadmapVersions,
}: Props) {
  const data = usePreviewData();

  return (
    <ThemeProvider>
      <div className="preview-content">
        {data.type === CustomPreviewType.EVENTS && (
          <EventCard
            event={data.payload}
            isPastEvent={
              !isUpcomingEvent(
                data.payload?.start_date || "",
                data.payload?.end_date || ""
              )
            }
          />
        )}
        {data.type === CustomPreviewType.JOBS && (
          <JobsCard hit={data.payload} />
        )}
        {data.type === CustomPreviewType.TUTORIALS && (
          <Box maxW="400px">
            <TutorialsCard hit={data.payload} locale="en" />
          </Box>
        )}
        {data.type === CustomPreviewType.POST && (
          <PostPage
            post={data.payload}
            params={{
              locale: "en",
              slug: "preview",
            }}
            topics={topics || []}
            categories={categories}
            latestAnnouncements={latestAnnouncements}
          />
        )}
        {data.type === CustomPreviewType.PAGE && (
          <CMSPage data={data.payload} locale="en" />
        )}
        {data.type === CustomPreviewType.ROADMAP_POST && (
          <RoadmapPost
            roadmapPost={data.payload}
            roadmapVersion={
              roadmapVersions.find((v) => v.version === data.payload.version)!
            }
            locale="en"
          />
        )}
        {data.type === CustomPreviewType.ROADMAP_VERSION && (
          <RoadmapPostVersion roadmapVersion={data.payload} />
        )}
      </div>
    </ThemeProvider>
  );
}

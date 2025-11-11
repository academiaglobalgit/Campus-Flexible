import Box from "@mui/material/Box";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import { ButtonFilters } from "../../molecules/ButtonFilters/ButtonFilters";
import VideoGrid from "../../molecules/VideoGrid/VideoGrid";
import { Divider } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutingPaths } from "@constants";

const filters = ['Todos', 'Tecnología', 'Programación', 'Administración', 'Multimedia', 'IA'];

const Multimedia: React.FC = () => {
    const navigate = useNavigate();

    const videos: any[] = [
        {
            id: 1,
            thumbnail: 'https://picsum.photos/seed/video1/800/450',
            duration: '25:40',
            title: 'Wildlife Documentary - Kehidupan Satwa Liar',
            author: 'Wild Planet',
            avatarLetter: 'WP',
            avatarColor: '#1976d2',
            views: '4.2 jt ditonton',
            uploadTime: '3 minggu yang lalu',
            category: 'Tecnología'
        },
        {
            id: 10,
            thumbnail: 'https://picsum.photos/seed/video1/800/450',
            duration: '25:40',
            title: 'Wildlife Documentary - Kehidupan Satwa Liar',
            author: 'Wild Planet',
            avatarLetter: 'WP',
            avatarColor: '#1976d2',
            views: '4.2 jt ditonton',
            uploadTime: '3 minggu yang lalu',
            category: 'Tecnología'
        },
        {
            id: 11,
            thumbnail: 'https://picsum.photos/seed/video1/800/450',
            duration: '25:40',
            title: 'Wildlife Documentary - Kehidupan Satwa Liar',
            author: 'Wild Planet',
            avatarLetter: 'WP',
            avatarColor: '#1976d2',
            views: '4.2 jt ditonton',
            uploadTime: '3 minggu yang lalu',
            category: 'Administración'
        },
        {
            id: 12,
            thumbnail: 'https://picsum.photos/seed/video1/800/450',
            duration: '25:40',
            title: 'Wildlife Documentary - Kehidupan Satwa Liar',
            author: 'Wild Planet',
            avatarLetter: 'WP',
            avatarColor: '#1976d2',
            views: '4.2 jt ditonton',
            uploadTime: '3 minggu yang lalu',
            category: 'Programación'
        },
        {
            id: 13,
            thumbnail: 'https://picsum.photos/seed/video1/800/450',
            duration: '25:40',
            title: 'Wildlife Documentary - Kehidupan Satwa Liar',
            author: 'Wild Planet',
            avatarLetter: 'WP',
            avatarColor: '#1976d2',
            views: '4.2 jt ditonton',
            uploadTime: '3 minggu yang lalu',
            category: 'Multimedia'
        },
    ];

    const [videoList, setVideoList] = React.useState(videos);

    const handleFilterClick = (filter: string) => {
        console.log("Filter selected:", filter);
        setVideoList( filter === 'Todos' ? videos : videos.filter(video => video.category === filter));
    }

    const handleVideoSelect = (video: any) => {
        console.log("Video selected:", video);
        navigate(AppRoutingPaths.CENTRO_INFORMACION_MULTIMEDIA_WATCH.replace(':id', video.id.toString()));
    }

    return (
        <ContainerDesktop
            title="Multimedia"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        >
            <Box>
                <ButtonFilters 
                    filter={filters} 
                    onClick={handleFilterClick}
                    defaultSelected="Todos"
                />
                <Divider />
                <VideoGrid videos={videoList} onVideoSelect={handleVideoSelect} />
            </Box>
        </ContainerDesktop>
    );
}

export default Multimedia;

export interface RegisterValues {
    username: string,
    first_name: string,
    last_name: string,
    password: string,
    confirm_password: string
}

export interface LoginValues {
    username: string,
    password: string,
}

export interface blogValues {
    title: string,
    description: string,
    selectedImage?: string
}

export interface imageField {
    setFile: Function,
    selectedImage: string | null,
    setSelectedImage: Function
}

export interface blogDetails {
    id: string,
    image: boolean,
    title: string,
    description: string,
    likes: number,
    slug: string,
    created_at: Date,
    user_id: string
}

export interface userDetails {
    id: string,
    username: string,
    first_name: string,
    last_name: string | null,
    created_at: Date
}

export interface DashBoardCardProps {
    name: string,
    totalCount: number
}

export interface BlogCardComponentProps {
    image: string,
    inDashboard?: boolean,
    user: userDetails,
    blog: blogDetails,
}

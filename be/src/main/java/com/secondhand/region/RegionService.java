package com.secondhand.region;

import com.secondhand.region.dto.RegionsDto;
import com.secondhand.region.repository.RegionRepository;
import com.secondhand.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegionService {

    private final UserRepository userRepository;
    private final RegionRepository regionRepository;

    public RegionsDto findAllRegions(Pageable pageable) {

        return new RegionsDto(regionRepository.findAllRegions(pageable));
    }
}
